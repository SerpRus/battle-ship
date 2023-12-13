cd packages/client
yarn build
yarn build:ssr
yarn link
cd ../server
yarn link client 
yarn build
cd ../../
yarn dev:server
