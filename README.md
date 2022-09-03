<p align="center"><img src="https://may-be.gay/thumbnail.png" width="600px" height="314px" alt="may-be.gay | free subdomains for possibly queer folx" /></p>
<a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a><br>
<b>may-be.gay</b> is a service in which you can register your own sub-domain for your personal website.

# How to register
## New method (Recommended)
1) Create a new file in the `domains` directory called `<subdomain>.toml`.
2) Using this template, create your site's file.
```toml
# You need to provide details about yourself that we can use to contact you.
[user]
username = "USERNAME"
# You have to have one of these.
email = "EMAIL"
discord = "DISCORD"

[records]
# Your site's records, i.e.
CNAME = "CNAME here"
```
## Legacy method
1) Get your website records ready. (`A` records and `URL` records aren't supported currently.)
2) DM \_hayrenryzm#7039 on Discord with the following:
```
The URL of your website

A short description about it

The subdomain you would like to register (i.e. hay.may-be.gay)

Your CNAME Record
```
3) That should be it!