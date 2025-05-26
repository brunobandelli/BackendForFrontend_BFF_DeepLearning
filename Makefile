# Instale o json-server em uma versão 0.x compatível com a flag -H
# sudo npm install -g json-server@0.17.3
# Para executar cada um, make posts/comments/users, rodar cada um em um terminal diferente.

posts:
	json-server external_apis/posts.json --port 3001 --host 0.0.0.0 --middlewares ./external_apis/random-delay.js

comments:
	json-server external_apis/comments.json --port 3002 --host 0.0.0.0 --middlewares ./external_apis/random-delay.js

users:
	json-server external_apis/users.json --port 3003 --host 0.0.0.0 --middlewares ./external_apis/random-delay.js


