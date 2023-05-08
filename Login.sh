echo "Logging in"
curl --insecure -v -d "@login.json" POST -H "Content-Type:application/json" http://localhost:3000/login
curl -v https://dev.stedi.me/validate/95fa12c4-5e2b-412d-8509-3eb3596ae8e3
