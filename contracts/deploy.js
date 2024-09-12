require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

console.log('Deploying with the following configuration:');
console.log(`DB User: ${dbUser}`);
console.log(`DB Password: ${dbPassword}`);

function deploy() {
    if (!dbUser || !dbPassword) {
        console.error('Missing environment variables. Deployment aborted.');
        return;
    }

    console.log('Deployment in progress...');
    setTimeout(() => {
        console.log('Deployment successful.');
    }, 2000);
}

deploy();