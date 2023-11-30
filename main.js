"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Three = require("three");
alert("Im a real clean programmer");
var camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
var scene = new Three.Scene();
var render = new Three.WebGLRenderer();
