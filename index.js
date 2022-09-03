const toml = require('toml');
const fs = require('fs');
const { fetch } = require('undici')

let domains = []

let argv = process.argv
argv.shift()
argv.shift()

domains = argv.map(x => x.replace('domains/', ''))

function registerNewRecord(record_type, subdomain, { records: tomlData }) {
  fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CF_ZONE_ID}/dns_records`, {
    method: 'POST',
    body: JSON.stringify({
      type: record_type,
      name: subdomain,
      content: tomlData[record],
      ttl: 1
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ process.env.CF_API_TOKEN
    }
  }).then(r => r.json());
}

// function editExistingRecord(record_type, subdomain, { records: tomlData }, cf_id) {
//   fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CF_ZONE_ID}/dns_records/${cf_id}`, {
//     method: 'PATCH',
//     body: JSON.stringify({
//       content: tomlData[record],
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer '+ process.env.CF_API_TOKEN
//     }
//   }).then(r => r.json());
// }

domains.forEach(async function(domain) {
  let data = toml.parse(fs.readFileSync('domains/' + domain).toString());

  const { result: records } = await fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CF_ZONE_ID}/dns_records`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ process.env.CF_API_TOKEN
    }
  }).then(r => r.json());

  const domainRecords = records.filter(x => x.name == domain.replace('.toml', '.may-be.gay'))

  if (!domainRecords.length) {
    Object.keys(data.records).forEach((record, i) => {
      registerNewRecord(record, domain.replace('.toml', ''), data)
    })
  } else if (domainRecords.length != Object.keys(data.records).length) {
    // A record was added or deleted, edit it
  } else {
    let changedRecords = domainRecords.filter(cf_record => data.records[cf_record.type] == cf_record.content)
    if (changedRecords.length) {
      // A record was changed, but no record was added or deleted, edit it
    } else {
      // Nothing was changed, don't edit it
    }
  }
})

