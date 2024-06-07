const express=require("express");
const bodyParser=require("body-parser");
const cors=require('cors');
require("./config/db");
const app=express();
app.use(bodyParser.json());
app.use(cors());