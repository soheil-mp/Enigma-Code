"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/dashboard",{

/***/ "./src/components/dashboard/Sidebar.tsx":
/*!**********************************************!*\
  !*** ./src/components/dashboard/Sidebar.tsx ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Sidebar)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! framer-motion */ \"./node_modules/framer-motion/dist/es/index.mjs\");\n\nvar _s = $RefreshSig$();\n\n\n\nfunction Sidebar() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const navigation = [\n        {\n            name: 'Command Center',\n            href: '/dashboard',\n            icon: '🚀',\n            description: 'Your mission control'\n        },\n        {\n            name: 'Resume Lab',\n            href: '/dashboard/resume',\n            icon: '⚡',\n            description: 'Craft your story'\n        },\n        {\n            name: 'Application Hub',\n            href: '/dashboard/applications',\n            icon: '🎯',\n            description: 'Track your victories'\n        },\n        {\n            name: 'Interview Arena',\n            href: '/dashboard/interviews',\n            icon: '💫',\n            description: 'Master your presence'\n        },\n        {\n            name: 'Market Radar',\n            href: '/dashboard/insights',\n            icon: '🌟',\n            description: 'Navigate opportunities'\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n        className: \"w-64 bg-white/70 backdrop-blur-md border-r border-white/20\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"h-full px-3 py-4\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                className: \"space-y-2\",\n                children: navigation.map((item, index)=>{\n                    const isActive = router.pathname === item.href;\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.li, {\n                        whileHover: {\n                            x: 4\n                        },\n                        whileTap: {\n                            scale: 0.98\n                        },\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: item.href,\n                            className: \"flex flex-col px-4 py-3 rounded-xl text-sm transition-all duration-200 group \".concat(isActive ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30' : 'text-gray-700 hover:bg-white hover:shadow-md'),\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"flex items-center\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                            className: \"text-xl mr-3 group-hover:scale-110 transition-transform\",\n                                            children: item.icon\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\Soheil\\\\Desktop\\\\Enigma-Code\\\\src\\\\components\\\\dashboard\\\\Sidebar.tsx\",\n                                            lineNumber: 63,\n                                            columnNumber: 21\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                            className: \"font-medium\",\n                                            children: item.name\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\Soheil\\\\Desktop\\\\Enigma-Code\\\\src\\\\components\\\\dashboard\\\\Sidebar.tsx\",\n                                            lineNumber: 66,\n                                            columnNumber: 21\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                            className: \"ml-auto text-xs opacity-50\",\n                                            children: [\n                                                \"Alt+\",\n                                                index + 1\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"C:\\\\Users\\\\Soheil\\\\Desktop\\\\Enigma-Code\\\\src\\\\components\\\\dashboard\\\\Sidebar.tsx\",\n                                            lineNumber: 67,\n                                            columnNumber: 21\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\Soheil\\\\Desktop\\\\Enigma-Code\\\\src\\\\components\\\\dashboard\\\\Sidebar.tsx\",\n                                    lineNumber: 62,\n                                    columnNumber: 19\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: \"text-xs mt-1 \".concat(isActive ? 'text-white/70' : 'text-gray-500'),\n                                    children: item.description\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Soheil\\\\Desktop\\\\Enigma-Code\\\\src\\\\components\\\\dashboard\\\\Sidebar.tsx\",\n                                    lineNumber: 69,\n                                    columnNumber: 19\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\Soheil\\\\Desktop\\\\Enigma-Code\\\\src\\\\components\\\\dashboard\\\\Sidebar.tsx\",\n                            lineNumber: 54,\n                            columnNumber: 17\n                        }, this)\n                    }, item.name, false, {\n                        fileName: \"C:\\\\Users\\\\Soheil\\\\Desktop\\\\Enigma-Code\\\\src\\\\components\\\\dashboard\\\\Sidebar.tsx\",\n                        lineNumber: 49,\n                        columnNumber: 15\n                    }, this);\n                })\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Soheil\\\\Desktop\\\\Enigma-Code\\\\src\\\\components\\\\dashboard\\\\Sidebar.tsx\",\n                lineNumber: 45,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Soheil\\\\Desktop\\\\Enigma-Code\\\\src\\\\components\\\\dashboard\\\\Sidebar.tsx\",\n            lineNumber: 44,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Soheil\\\\Desktop\\\\Enigma-Code\\\\src\\\\components\\\\dashboard\\\\Sidebar.tsx\",\n        lineNumber: 43,\n        columnNumber: 5\n    }, this);\n}\n_s(Sidebar, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Sidebar;\nvar _c;\n$RefreshReg$(_c, \"Sidebar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9kYXNoYm9hcmQvU2lkZWJhci50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUE0QjtBQUNXO0FBRUQ7QUFFdkIsU0FBU0c7O0lBQ3RCLE1BQU1DLFNBQVNILHNEQUFTQTtJQUV4QixNQUFNSSxhQUFhO1FBQ2pCO1lBQ0VDLE1BQU07WUFDTkMsTUFBTTtZQUNOQyxNQUFNO1lBQ05DLGFBQWE7UUFDZjtRQUNBO1lBQ0VILE1BQU07WUFDTkMsTUFBTTtZQUNOQyxNQUFNO1lBQ05DLGFBQWE7UUFDZjtRQUNBO1lBQ0VILE1BQU07WUFDTkMsTUFBTTtZQUNOQyxNQUFNO1lBQ05DLGFBQWE7UUFDZjtRQUNBO1lBQ0VILE1BQU07WUFDTkMsTUFBTTtZQUNOQyxNQUFNO1lBQ05DLGFBQWE7UUFDZjtRQUNBO1lBQ0VILE1BQU07WUFDTkMsTUFBTTtZQUNOQyxNQUFNO1lBQ05DLGFBQWE7UUFDZjtLQUNEO0lBRUQscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVU7a0JBQ2IsNEVBQUNDO1lBQUlELFdBQVU7c0JBQ2IsNEVBQUNFO2dCQUFHRixXQUFVOzBCQUNYTixXQUFXUyxHQUFHLENBQUMsQ0FBQ0MsTUFBTUM7b0JBQ3JCLE1BQU1DLFdBQVdiLE9BQU9jLFFBQVEsS0FBS0gsS0FBS1IsSUFBSTtvQkFDOUMscUJBQ0UsOERBQUNMLGlEQUFNQSxDQUFDaUIsRUFBRTt3QkFFUkMsWUFBWTs0QkFBRUMsR0FBRzt3QkFBRTt3QkFDbkJDLFVBQVU7NEJBQUVDLE9BQU87d0JBQUs7a0NBRXhCLDRFQUFDdkIsa0RBQUlBOzRCQUNITyxNQUFNUSxLQUFLUixJQUFJOzRCQUNmSSxXQUFXLGdGQUlWLE9BSENNLFdBQ0kseUZBQ0E7OzhDQUdOLDhEQUFDTDtvQ0FBSUQsV0FBVTs7c0RBQ2IsOERBQUNhOzRDQUFLYixXQUFVO3NEQUNiSSxLQUFLUCxJQUFJOzs7Ozs7c0RBRVosOERBQUNnQjs0Q0FBS2IsV0FBVTtzREFBZUksS0FBS1QsSUFBSTs7Ozs7O3NEQUN4Qyw4REFBQ2tCOzRDQUFLYixXQUFVOztnREFBNkI7Z0RBQUtLLFFBQVE7Ozs7Ozs7Ozs7Ozs7OENBRTVELDhEQUFDUTtvQ0FBS2IsV0FBVyxnQkFBNkQsT0FBN0NNLFdBQVcsa0JBQWtCOzhDQUMzREYsS0FBS04sV0FBVzs7Ozs7Ozs7Ozs7O3VCQXBCaEJNLEtBQUtULElBQUk7Ozs7O2dCQXdCakI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNYjtHQTFFd0JIOztRQUNQRixrREFBU0E7OztLQURGRSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2Rhc2hib2FyZC9TaWRlYmFyLnRzeD84YThmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluaydcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJ1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBtb3Rpb24gfSBmcm9tICdmcmFtZXItbW90aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaWRlYmFyKCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxuICBcbiAgY29uc3QgbmF2aWdhdGlvbiA9IFtcbiAgICB7IFxuICAgICAgbmFtZTogJ0NvbW1hbmQgQ2VudGVyJywgXG4gICAgICBocmVmOiAnL2Rhc2hib2FyZCcsIFxuICAgICAgaWNvbjogJ/CfmoAnLFxuICAgICAgZGVzY3JpcHRpb246ICdZb3VyIG1pc3Npb24gY29udHJvbCdcbiAgICB9LFxuICAgIHsgXG4gICAgICBuYW1lOiAnUmVzdW1lIExhYicsIFxuICAgICAgaHJlZjogJy9kYXNoYm9hcmQvcmVzdW1lJywgXG4gICAgICBpY29uOiAn4pqhJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ3JhZnQgeW91ciBzdG9yeSdcbiAgICB9LFxuICAgIHsgXG4gICAgICBuYW1lOiAnQXBwbGljYXRpb24gSHViJywgXG4gICAgICBocmVmOiAnL2Rhc2hib2FyZC9hcHBsaWNhdGlvbnMnLCBcbiAgICAgIGljb246ICfwn46vJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVHJhY2sgeW91ciB2aWN0b3JpZXMnXG4gICAgfSxcbiAgICB7IFxuICAgICAgbmFtZTogJ0ludGVydmlldyBBcmVuYScsIFxuICAgICAgaHJlZjogJy9kYXNoYm9hcmQvaW50ZXJ2aWV3cycsIFxuICAgICAgaWNvbjogJ/CfkqsnLFxuICAgICAgZGVzY3JpcHRpb246ICdNYXN0ZXIgeW91ciBwcmVzZW5jZSdcbiAgICB9LFxuICAgIHsgXG4gICAgICBuYW1lOiAnTWFya2V0IFJhZGFyJywgXG4gICAgICBocmVmOiAnL2Rhc2hib2FyZC9pbnNpZ2h0cycsIFxuICAgICAgaWNvbjogJ/CfjJ8nLFxuICAgICAgZGVzY3JpcHRpb246ICdOYXZpZ2F0ZSBvcHBvcnR1bml0aWVzJ1xuICAgIH0sXG4gIF1cblxuICByZXR1cm4gKFxuICAgIDxuYXYgY2xhc3NOYW1lPVwidy02NCBiZy13aGl0ZS83MCBiYWNrZHJvcC1ibHVyLW1kIGJvcmRlci1yIGJvcmRlci13aGl0ZS8yMFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLWZ1bGwgcHgtMyBweS00XCI+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICB7bmF2aWdhdGlvbi5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IHJvdXRlci5wYXRobmFtZSA9PT0gaXRlbS5ocmVmXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8bW90aW9uLmxpIFxuICAgICAgICAgICAgICAgIGtleT17aXRlbS5uYW1lfVxuICAgICAgICAgICAgICAgIHdoaWxlSG92ZXI9e3sgeDogNCB9fVxuICAgICAgICAgICAgICAgIHdoaWxlVGFwPXt7IHNjYWxlOiAwLjk4IH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICAgICAgaHJlZj17aXRlbS5ocmVmfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBmbGV4LWNvbCBweC00IHB5LTMgcm91bmRlZC14bCB0ZXh0LXNtIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCBncm91cCAke1xuICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1ibHVlLTUwMCB0by1pbmRpZ28tNTAwIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1ibHVlLTUwMC8zMCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktNzAwIGhvdmVyOmJnLXdoaXRlIGhvdmVyOnNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14bCBtci0zIGdyb3VwLWhvdmVyOnNjYWxlLTExMCB0cmFuc2l0aW9uLXRyYW5zZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLmljb259XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW1cIj57aXRlbS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWwtYXV0byB0ZXh0LXhzIG9wYWNpdHktNTBcIj5BbHQre2luZGV4ICsgMX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQteHMgbXQtMSAke2lzQWN0aXZlID8gJ3RleHQtd2hpdGUvNzAnIDogJ3RleHQtZ3JheS01MDAnfWB9PlxuICAgICAgICAgICAgICAgICAgICB7aXRlbS5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgIDwvbW90aW9uLmxpPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICApfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgPC9uYXY+XG4gIClcbn0gIl0sIm5hbWVzIjpbIkxpbmsiLCJ1c2VSb3V0ZXIiLCJtb3Rpb24iLCJTaWRlYmFyIiwicm91dGVyIiwibmF2aWdhdGlvbiIsIm5hbWUiLCJocmVmIiwiaWNvbiIsImRlc2NyaXB0aW9uIiwibmF2IiwiY2xhc3NOYW1lIiwiZGl2IiwidWwiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJpc0FjdGl2ZSIsInBhdGhuYW1lIiwibGkiLCJ3aGlsZUhvdmVyIiwieCIsIndoaWxlVGFwIiwic2NhbGUiLCJzcGFuIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/dashboard/Sidebar.tsx\n"));

/***/ })

});