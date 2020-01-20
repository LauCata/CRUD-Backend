const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');

//const indexRoutes = require('./routes/index');
const tareasRoutes = require('./routes/tareas');


//Configuraciones 
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(cors());
app.use(express.json());

//Routes
//app.use(indexRoutes);
app.use("/api", tareasRoutes);

//Static files
app.use(express.static(path.join(__dirname, 'dist')));

//Start server
app.listen(app.get('port'), () => {
    console.log('server 3000', app.get('port'));
});
