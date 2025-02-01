import swaggerAutogen from 'swagger-autogen'

const outputFile = './src/config/swagger/swagger.json'; // Output file
const endpointsFiles = [
    './src/routers/Auth.js',
    './src/routers/User.js'
]; // Semua file route yang ingin didokumentasikan

const doc = {
    info: {
        title: 'My API', // Nama API
        description: 'This is a sample API documentation',
    },
    host: 'localhost:5555', // Host API kamu
    basePath: '/', // Root path API kamu
    schemes: ['http'], // Skema yang digunakan
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger file generated');
});
