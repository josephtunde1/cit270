echo "Logging in"

curl -v -d "@login.json" POST -H "Content-Type:application/json" https://dev.stedi.me/login

curl https://dev.stedi.me/validate/95fa12c4-5e2b-412d-8509-3eb3596ae8e3
