import fs from 'fs'
import axios from 'axios'
import shell from 'shelljs'
const argv = process.argv
const minFile = argv[2].replace('.js', '')
if (argv[3] == 'terser') {
  shell.exec(`terser ${argv[2]} -c pure_funcs=[console.log],toplevel=true.keep_classnames=false.keen_fnames=true -m -o ${minFile}.min.js`)
  console.log('加密成功！');
} else {
  const obj = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
  }
  const toolHeader = {
    ...{
      'cookie': 'Hm_lvt_fac31d04ac0665681d0508a5388fe8c2=1678517774; uuid=016a6ddf-6d4a-4433-a22e-3754022493d3; Hm_lvt_0fba23df1ee7ec49af558fb29456f532=1681460197,1681790595,1681871712,1683619410; _session=%7B%22slim.flash%22%3A%5B%5D%7D; Hm_lpvt_0fba23df1ee7ec49af558fb29456f532=1683943063; _access=fe5fd59b1d78dcb40208cfbffaa9a28f88f58ac173d64fc5c28e2b13ca0a902b',
      'origin': 'https://tool.lu',
      'referer': 'https://tool.lu/js/',
      'x-requested-with': 'XMLHttpRequest'
    }, ...obj
  }
  const jshamanHeader = {
    ...{
      'Connection': 'keep-alive',
      'Origin': 'http://www.jshaman.com',
      'Referer': 'http://www.jshaman.com/',
    }, ...obj
  }


  // return
  //fs  核心模块中提供了一个  fs.readFile方法,来读取指定目录下的文件
  //fs.resdFile 三个参数

  // 1,读取文件的路径
  // 2,读取文件的编码格式
  // 3,当文件读取完成,调用这个callback回调函数来读取文件的结果
  //第一个参数文error对象   第二个参数 才是读取成功的结果
  // fs.readFile('./http/111.txt','utf-8',function(error,data){
  // console.log(error);  //如果err为null就说明读取成功了,没有出错
  // console.log(data); // 如果不给第二个参数[读取的文件编码格式]就会以beffer格式输出
  // });

  const getTool = (parm) => {
    axios.post('https://tool.lu/js/ajax.html', {
      code: parm,
      operate: 'pack'
    }, { headers: toolHeader }).then(function (response) {        // 处理成功情况        
      console.log('加密成功！');        //response有几个重要的属性        
      console.log('正在写入文件中...')
      fs.writeFile(`${minFile}.min.js`, response.data.text, (err) => {
        if (err) throw err;
        console.log('写入文件成功，加密完成！')
      })

    });
  }

  fs.readFile(argv[2], "utf-8", function (error, data) {
    // console.log(error);  //如果err为null就说明读取成功了,没有出错
    // console.log(data); // 如果不给第二个参数[读取的文件编码格式]就会以beffer格式输出
    //  用error来判断文件是否读取成功
    if (error) return console.log("读取文件失败,内容是" + error.message);
    console.log('读取文件成功，正在上传加密...')
    axios.post('http://www.jshaman.com:800/submit_js_code', {
      js_code: data,
      vip_code: 'free'
    }, { headers: jshamanHeader }).then(function (res) {        // 处理成功情况        
      getTool(res.data.content)
    });

  });
}

