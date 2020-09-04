/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EPSILON = 0.05;

	function arrow(ctx, x1, y1, x2, y2, s) {
	  var a = Math.atan2(y2 - y1, x2 - x1);

	  ctx.beginPath();
	  ctx.moveTo(x1, y1);
	  ctx.lineTo(x2 - 0.8 * s * Math.cos(a), y2 - 0.8 * s * Math.sin(a));
	  ctx.lineTo(x2 - s * Math.cos(a - Math.PI / 7), y2 - s * Math.sin(a - Math.PI / 7));
	  ctx.lineTo(x2, y2);
	  ctx.lineTo(x2 - s * Math.cos(a + Math.PI / 7), y2 - s * Math.sin(a + Math.PI / 7));
	  ctx.lineTo(x2 - 0.8 * s * Math.cos(a), y2 - 0.8 * s * Math.sin(a));
	  ctx.closePath();
	  ctx.stroke();
	  ctx.fill();
	}

	function crosshair(ctx, x, y, s) {
	  ctx.beginPath();
	  ctx.arc(x, y, s, 0, 2 * Math.PI, false);
	  ctx.moveTo(x, y + s / 2);
	  ctx.lineTo(x, y + s * 3 / 2);
	  ctx.moveTo(x, y - s / 2);
	  ctx.lineTo(x, y - s * 3 / 2);
	  ctx.moveTo(x + s / 2, y);
	  ctx.lineTo(x + s * 3 / 2, y);
	  ctx.moveTo(x - s / 2, y);
	  ctx.lineTo(x - s * 3 / 2, y);
	  ctx.stroke();
	}

	var CanvasComponent = function (_React$Component) {
	  _inherits(CanvasComponent, _React$Component);

	  function CanvasComponent() {
	    _classCallCheck(this, CanvasComponent);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CanvasComponent).call(this));

	    _this.state = { a: 3, c: 0, b: 1, d: 2, x: 1, y: 1, currentCrossHair: 0 };
	    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
	    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
	    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
	    return _this;
	  }

	  _createClass(CanvasComponent, [{
	    key: "getMousePos",
	    value: function getMousePos(event) {
	      var canvas = this.refs.canvas;
	      var rect = canvas.getBoundingClientRect();

	      var xRatio = this.props.scale * rect.width / canvas.width;
	      var yRatio = -this.props.scale * rect.height / canvas.height;

	      var x = (event.clientX - rect.left - rect.width / 2) / xRatio;
	      var y = (event.clientY - rect.top - rect.height / 2) / yRatio;
	      return { x: x, y: y };
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var self = this;
	      var canvas = this.refs.canvas;

	      canvas.addEventListener("touchstart", function (touchEvent) {
	        var mouseEvent = new MouseEvent("mousedown", {
	          clientX: touchEvent.touches[0].clientX,
	          clientY: touchEvent.touches[0].clientY
	        });
	        self.handleMouseDown(mouseEvent);
	      }, false);

	      canvas.addEventListener("touchend", function (touchEvent) {
	        var mouseEvent = new MouseEvent("mouseup", {});
	        self.handleMouseUp(mouseEvent);
	      }, false);

	      canvas.addEventListener("touchmove", function (touchEvent) {
	        var mouseEvent = new MouseEvent("mousemove", {
	          clientX: touchEvent.touches[0].clientX,
	          clientY: touchEvent.touches[0].clientY
	        });
	        self.handleMouseMove(mouseEvent);
	      }, false);

	      // Prevent scrolling when touching the canvas
	      document.body.addEventListener("touchstart", function (e) {
	        if (e.target == canvas) {
	          e.preventDefault();
	        }
	      }, false);
	      document.body.addEventListener("touchend", function (e) {
	        if (e.target == canvas) {
	          e.preventDefault();
	        }
	      }, false);
	      document.body.addEventListener("touchmove", function (e) {
	        if (e.target == canvas) {
	          e.preventDefault();
	        }
	      }, false);

	      this.updateCanvas();
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate() {
	      this.updateCanvas();
	    }
	  }, {
	    key: "handleMouseDown",
	    value: function handleMouseDown(event) {
	      // Find distance to each target from mouse click
	      var mousePosition = this.getMousePos(event);
	      var d1 = numeric.norm2(numeric.sub([mousePosition.x, mousePosition.y], [this.state.a, this.state.c]));
	      var d2 = numeric.norm2(numeric.sub([mousePosition.x, mousePosition.y], [this.state.b, this.state.d]));
	      var d3 = numeric.norm2(numeric.sub([mousePosition.x, mousePosition.y], [this.state.x, this.state.y]));

	      // Pick the closest target to the mouse click
	      if (Math.min(d1, d2, d3) == d1) {
	        this.state.currentCrossHair = 1;
	      } else if (Math.min(d1, d2, d3) == d2) {
	        this.state.currentCrossHair = 2;
	      } else if (Math.min(d1, d2, d3) == d3) {
	        this.state.currentCrossHair = 3;
	      }

	      this.handleMouseMove(event);
	    }
	  }, {
	    key: "handleMouseUp",
	    value: function handleMouseUp(event) {
	      this.state.currentCrossHair = 0;
	    }
	  }, {
	    key: "handleMouseMove",
	    value: function handleMouseMove(event) {
	      if (this.state.currentCrossHair != 0) {
	        var mousePosition = this.getMousePos(event);

	        if (this.props.snapToGrid) {
	          var xSnap = Math.round(mousePosition.x * 2) / 2;
	          var ySnap = Math.round(mousePosition.y * 2) / 2;

	          if (Math.abs(xSnap - mousePosition.x) < EPSILON) {
	            mousePosition.x = xSnap;
	          }

	          if (Math.abs(ySnap - mousePosition.y) < EPSILON) {
	            mousePosition.y = ySnap;
	          }
	        }

	        if (this.state.currentCrossHair == 1) {
	          this.state.a = mousePosition.x;
	          this.state.c = mousePosition.y;
	        } else if (this.state.currentCrossHair == 2) {
	          this.state.b = mousePosition.x;
	          this.state.d = mousePosition.y;
	        } else if (this.state.currentCrossHair == 3) {
	          this.state.x = mousePosition.x;
	          this.state.y = mousePosition.y;
	        }

	        this.updateCanvas();
	      }
	    }
	  }, {
	    key: "updateCanvas",
	    value: function updateCanvas() {
	      var canvas = this.refs.canvas;
	      canvas.style.backgroundColor = 'rgba(0, 0, 0, 1)';

	      var ctx = canvas.getContext('2d');
	      ctx.clearRect(0, 0, canvas.width, canvas.height);

	      ctx.save();
	      ctx.translate(canvas.width / 2, canvas.height / 2);
	      ctx.scale(this.props.scale, -this.props.scale);

	      var mf = [[this.state.a, this.state.b], [this.state.c, this.state.d]];
	      var m = [[1 - this.props.t + this.props.t * this.state.a, this.props.t * this.state.b], [this.props.t * this.state.c, 1 - this.props.t + this.props.t * this.state.d]];

	      ctx.lineWidth = 0.02;

	      // Minor Grid Lines
	      ctx.strokeStyle = '#212121';

	      for (var i = -19.5; i <= 19.5; i++) {
	        ctx.beginPath();
	        ctx.moveTo(-20, i);
	        ctx.lineTo(20, i);
	        ctx.stroke();

	        ctx.beginPath();
	        ctx.moveTo(i, -20);
	        ctx.lineTo(i, 20);
	        ctx.stroke();
	      }

	      // Major Grid Lines
	      ctx.strokeStyle = '#606060';

	      for (var _i = -20; _i <= 20; _i++) {
	        ctx.beginPath();
	        ctx.moveTo(-20, _i);
	        ctx.lineTo(20, _i);
	        ctx.stroke();

	        ctx.beginPath();
	        ctx.moveTo(_i, -20);
	        ctx.lineTo(_i, 20);
	        ctx.stroke();
	      }

	      ctx.lineWidth = 0.04;

	      // Major Grid Lines Transformed
	      ctx.strokeStyle = '#1fabc3';

	      for (var _i2 = -20; _i2 <= 20; _i2++) {
	        ctx.beginPath();
	        ctx.moveTo.apply(ctx, numeric.dot(m, [-20, _i2]));
	        ctx.lineTo.apply(ctx, numeric.dot(m, [20, _i2]));
	        ctx.stroke();

	        ctx.beginPath();
	        ctx.moveTo.apply(ctx, numeric.dot(m, [_i2, -20]));
	        ctx.lineTo.apply(ctx, numeric.dot(m, [_i2, 20]));
	        ctx.stroke();
	      }

	      // Primary Axis
	      ctx.strokeStyle = '#ffffff';

	      ctx.beginPath();
	      ctx.moveTo.apply(ctx, numeric.dot(m, [-20, 0]));
	      ctx.lineTo.apply(ctx, numeric.dot(m, [20, 0]));
	      ctx.stroke();

	      ctx.beginPath();
	      ctx.moveTo.apply(ctx, numeric.dot(m, [0, -20]));
	      ctx.lineTo.apply(ctx, numeric.dot(m, [0, 20]));
	      ctx.stroke();

	      // Determinant
	      if (this.props.determinant) {
	        if (numeric.det(m) < 0) {
	          ctx.strokeStyle = '#fd00fe';
	          ctx.fillStyle = 'rgba(253, 0, 254, 0.5)';
	        } else {
	          ctx.strokeStyle = '#fdfe00';
	          ctx.fillStyle = 'rgba(253, 254, 0, 0.5)';
	        }
	        ctx.beginPath();
	        ctx.moveTo(0, 0);
	        ctx.lineTo.apply(ctx, numeric.dot(m, [1, 0]));
	        ctx.lineTo.apply(ctx, numeric.dot(m, [1, 1]));
	        ctx.lineTo.apply(ctx, numeric.dot(m, [0, 1]));
	        ctx.closePath();
	        ctx.stroke();
	        ctx.fill();
	      }

	      // Eigen vectors
	      if (this.props.eigenvectors && this.props.t > 0) {
	        var evs = numeric.eig(m);

	        // Only show real eigenvectors
	        if (evs.E.y == undefined) {
	          var ev1 = [evs.lambda.x[0] * evs.E.x[0][0], evs.lambda.x[0] * evs.E.x[1][0]];
	          var ev2 = [evs.lambda.x[1] * evs.E.x[0][1], evs.lambda.x[1] * evs.E.x[1][1]];

	          var oldLineWidth = ctx.lineWidth;
	          ctx.lineWidth = 0.01;

	          ctx.strokeStyle = '#ffc181';
	          ctx.fillStyle = '#ffc181';
	          for (var _i3 = -20; _i3 <= 20; _i3++) {
	            if (_i3 == 0) continue;
	            arrow(ctx, 0, 0, _i3 * ev1[0], _i3 * ev1[1], 0.2);
	            arrow(ctx, 0, 0, _i3 * ev2[0], _i3 * ev2[1], 0.2);
	          }

	          ctx.lineWidth = oldLineWidth;
	        }
	      }

	      // iHat Basis vector
	      ctx.strokeStyle = '#8cbe63';
	      ctx.fillStyle = '#8cbe63';
	      var iHat = numeric.dot(m, [1, 0]);
	      arrow(ctx, 0, 0, iHat[0], iHat[1], 0.2);

	      // jHat Basis vector
	      ctx.strokeStyle = '#ff7c5c';
	      ctx.fillStyle = '#ff7c5c';
	      var jHat = numeric.dot(m, [0, 1]);
	      arrow(ctx, 0, 0, jHat[0], jHat[1], 0.2);

	      // Input/Output vector
	      if (this.props.inoutVector) {
	        ctx.strokeStyle = '#fdfe00';
	        ctx.fillStyle = '#fdfe00';
	        var tov = numeric.dot(m, [this.state.x, this.state.y]);
	        arrow(ctx, 0, 0, tov[0], tov[1], 0.2);

	        // Input Crosshair
	        ctx.strokeStyle = '#fdfe00';
	        ctx.fillStyle = '#fdfe00';
	        crosshair(ctx, this.state.x, this.state.y, 0.16);
	      }

	      // Transformed iHat crosshair
	      ctx.strokeStyle = '#8cbe63';
	      ctx.fillStyle = '#8cbe63';
	      crosshair(ctx, this.state.a, this.state.c, 0.16);

	      // Transformed jHat crosshair
	      ctx.strokeStyle = '#ff7c5c';
	      ctx.fillStyle = '#ff7c5c';
	      crosshair(ctx, this.state.b, this.state.d, 0.16);

	      ctx.restore();

	      // Output Matrix
	      ctx.lineWidth = 4;
	      ctx.strokeStyle = '#ffffff';

	      ctx.beginPath();
	      ctx.moveTo(15, 10);
	      ctx.lineTo(10, 10);
	      ctx.lineTo(10, 80);
	      ctx.lineTo(15, 80);
	      ctx.stroke();

	      ctx.beginPath();
	      ctx.moveTo(155, 10);
	      ctx.lineTo(160, 10);
	      ctx.lineTo(160, 80);
	      ctx.lineTo(155, 80);
	      ctx.stroke();

	      ctx.beginPath();
	      ctx.moveTo(175, 10);
	      ctx.lineTo(170, 10);
	      ctx.lineTo(170, 80);
	      ctx.lineTo(175, 80);
	      ctx.stroke();

	      ctx.beginPath();
	      ctx.moveTo(235, 10);
	      ctx.lineTo(240, 10);
	      ctx.lineTo(240, 80);
	      ctx.lineTo(235, 80);
	      ctx.stroke();

	      ctx.beginPath();
	      ctx.moveTo(280, 10);
	      ctx.lineTo(275, 10);
	      ctx.lineTo(275, 80);
	      ctx.lineTo(280, 80);
	      ctx.stroke();

	      ctx.beginPath();
	      ctx.moveTo(340, 10);
	      ctx.lineTo(345, 10);
	      ctx.lineTo(345, 80);
	      ctx.lineTo(340, 80);
	      ctx.stroke();

	      ctx.font = "20pt serif";

	      ctx.fillStyle = '#8cbe63';
	      ctx.fillText(this.state.a.toFixed(2), 20, 35);
	      ctx.fillText(this.state.c.toFixed(2), 20, 75);

	      ctx.fillStyle = '#ff7c5c';
	      ctx.fillText(this.state.b.toFixed(2), 90, 35);
	      ctx.fillText(this.state.d.toFixed(2), 90, 75);

	      ctx.fillStyle = '#fdfe00';
	      ctx.fillText(this.state.x.toFixed(2), 180, 35);
	      ctx.fillText(this.state.y.toFixed(2), 180, 75);

	      ctx.fillStyle = '#ffffff';
	      ctx.fillText("=", 250, 50);
	      var fv = numeric.dot(mf, [this.state.x, this.state.y]);
	      ctx.fillText(fv[0].toFixed(2), 285, 35);
	      ctx.fillText(fv[1].toFixed(2), 285, 75);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return React.createElement("canvas", { id: "matvis", ref: "canvas", width: 1140, height: 640,
	        style: { width: '100%' },
	        onMouseDown: this.handleMouseDown,
	        onMouseMove: this.handleMouseMove,
	        onMouseUp: this.handleMouseUp });
	    }
	  }]);

	  return CanvasComponent;
	}(React.Component);

	var App = function (_React$Component2) {
	  _inherits(App, _React$Component2);

	  function App() {
	    _classCallCheck(this, App);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

	    _this2.state = {
	      t: 0,
	      inoutVector: false,
	      determinant: false,
	      eigenvectors: false,
	      snapToGrid: false
	    };

	    _this2.handleChange = _this2.handleChange.bind(_this2);
	    _this2.toggleInoutVector = _this2.toggleInoutVector.bind(_this2);
	    _this2.toggleDeterminant = _this2.toggleDeterminant.bind(_this2);
	    _this2.toggleEigenvectors = _this2.toggleEigenvectors.bind(_this2);
	    _this2.toggleSnapToGrid = _this2.toggleSnapToGrid.bind(_this2);
	    return _this2;
	  }

	  _createClass(App, [{
	    key: "handleChange",
	    value: function handleChange(event) {
	      this.setState({ t: event.target.value });
	    }
	  }, {
	    key: "toggleInoutVector",
	    value: function toggleInoutVector(event) {
	      this.setState({ inoutVector: event.target.checked });
	    }
	  }, {
	    key: "toggleDeterminant",
	    value: function toggleDeterminant(event) {
	      this.setState({ determinant: event.target.checked });
	    }
	  }, {
	    key: "toggleEigenvectors",
	    value: function toggleEigenvectors(event) {
	      this.setState({ eigenvectors: event.target.checked });
	    }
	  }, {
	    key: "toggleSnapToGrid",
	    value: function toggleSnapToGrid(event) {
	      this.setState({ snapToGrid: event.target.checked });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { id: "mainContainer", className: "container" },
	        React.createElement(
	          "h4",
	          null,
	          React.createElement(
	            "a",
	            { href: "https://ganeshchk.github.io" },
	            "Linear Transformation Visualizer - created by Ganesh khadanga"
	          )
	        ),
	        React.createElement(
	          ReactBootstrap.Panel,
	          null,
	          React.createElement(CanvasComponent, {
	            t: this.state.t,
	            inoutVector: this.state.inoutVector,
	            determinant: this.state.determinant,
	            eigenvectors: this.state.eigenvectors,
	            snapToGrid: this.state.snapToGrid,
	            scale: 60 }),
	          React.createElement(
	            ReactBootstrap.Form,
	            { horizontal: true },
	            React.createElement(
	              ReactBootstrap.Col,
	              { componentClass: ReactBootstrap.ControlLabel, sm: 1 },
	              "t: (",
	              this.state.t,
	              ")"
	            ),
	            React.createElement(
	              ReactBootstrap.Col,
	              { sm: 11 },
	              React.createElement(ReactBootstrap.FormControl, { type: "range", min: 0, max: 1, step: 0.01,
	                value: this.state.t, onChange: this.handleChange })
	            ),
	            React.createElement(
	              ReactBootstrap.Col,
	              { sm: 2 },
	              React.createElement(
	                ReactBootstrap.Checkbox,
	                { checked: this.state.inoutVector,
	                  onChange: this.toggleInoutVector },
	                "Show In/Out Vector"
	              )
	            ),
	            React.createElement(
	              ReactBootstrap.Col,
	              { sm: 2 },
	              React.createElement(
	                ReactBootstrap.Checkbox,
	                { checked: this.state.determinant,
	                  onChange: this.toggleDeterminant },
	                "Show Determinant"
	              )
	            ),
	            React.createElement(
	              ReactBootstrap.Col,
	              { sm: 2 },
	              React.createElement(
	                ReactBootstrap.Checkbox,
	                { checked: this.state.eigenvectors,
	                  onChange: this.toggleEigenvectors },
	                "Show Eigenvectors"
	              )
	            ),
	            React.createElement(
	              ReactBootstrap.Col,
	              { sm: 2 },
	              React.createElement(
	                ReactBootstrap.Checkbox,
	                { checked: this.state.snapToGrid,
	                  onChange: this.toggleSnapToGrid },
	                "Snap to Grid"
	              )
	            )
	          )
	        ),
	        React.createElement(
	          "h4",
	          null,
	          "Instructions"
	        ),
	        React.createElement(
	          "ul",
	          null,
	          React.createElement(
	            "li",
	            null,
	            "Drag the green and red targets to set in the transformed basis vectors."
	          ),
	          React.createElement(
	            "li",
	            null,
	            "Drag the t slider to visualize the transformation."
	          ),
	          React.createElement(
	            "li",
	            null,
	            "Enable the In/Out Vector to show a vector and its corresponding visualization."
	          ),
	          React.createElement(
	            "li",
	            null,
	            "Enable the Determinant to show the determinant in the visualization."
	          ),
	          React.createElement(
	            "li",
	            null,
	            "Enable the Eigenvectors to show the eigenvectors in the visualization."
	          )
	        )
	      );
	    }
	  }]);

	  return App;
	}(React.Component);

	ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

/***/ })
/******/ ]);