.PHONY: deploy
deploy:
	npm run build
	scp -r ./dist/* hostinger:/docker/nginx-proxy-manager/www/reunion-remyrichard.fr