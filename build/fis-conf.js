fis.set('project.ignore', [
    '.idea/**',
    '.git/**',
    '.gitignore',
    '**.md',

    'build/**',
    'output/**'
]);

fis.match('**.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
});

//可以使用fis插件来编译ts，但速度有点慢。故最终选择在build.sh中使用tsc编译
//fis.match('**.ts', {
//    parser: fis.plugin('ts'), //https://libraries.io/npm/fis-parser-ts
//    rExt: '.js'
//});
//ts配置
//fis.config.set('settings.parser.ts.compileSetting', {
//    module: "amd",
//    target: "ES5"
//});

fis.match('**', {
    release: '/o2o/$0',
    url: '/~lvsheng/o2o/$0'
});

//TODO: 打开下面配置，并配置fis能正确替换url
//fis.match('src/(**)', {
//    release: '/o2o/vm/$1',
//    url: '/~lvsheng/o2o/vm/$1'
//});

//TODO 暂时不发布，都在js中将文件__inline进来，后面换更合适方案
fis.match('{**.css,sample/**/widget/**.html}', {
    release: false
});

//远程部署
fis.match('**', {
    deploy: fis.plugin('http-push', {
        receiver: 'http://fedev.baidu.com/~lvsheng/fis-receiver.php',
        to: '/home/lvsheng/public_html'
    })
});
