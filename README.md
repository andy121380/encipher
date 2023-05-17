#### 1.依赖
 - ”@swc/cli": "^0.1.62“ （生成文件 暂时不用）    "b1": "npx swc ./src/main.s.js -o src/main.min.js",
 - “@swc/core": "^1.3.57" （生成文件 暂时不用）    "b2": "npx swc ./src/vbs.s.ts -o src/vbs.min.js",

 - terser：代码压缩工具
 - shelljs：shelljs是Unix Shell在Node.js API层的轻量级实现，可以支持Windows、Linux、OS X


 #### 2.代码加密
  - 方案1：npm run dev xxx(路径)
  - 方案2：npm run dev xxx(路径) a