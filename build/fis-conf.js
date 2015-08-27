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

//TODO: 自己写一个小的插件来搞这件事？（用shelljs来exec本地的tsc进行编译）
//build.sh中编译导致生成的js与map文件都存在于源码位置，影响源码阅读~ 不爽
//可以使用fis插件来编译ts，但速度有点慢、而且tsc版本低，源码编译时有报错（貌似不支持export from）
fis.match('**.ts', {
    parser: fis.plugin('local-tsc', {
        hello: 'conf'
    }),
    rExt: '.js'
});


fis.match('**', {
    release: '/o2o/vm/$0',
    url: '/~lvsheng/o2o/vm/$0'
});

//TODO 暂时不发布，都在js中将文件__inline进来，后面换更合适方案
fis.match('{**.css,sample/**/widget/**.html}', {
    release: false
});

//远程部署
//fis.match('**', {
//    deploy: fis.plugin('http-push', {
//        receiver: 'http://fedev.baidu.com/~lvsheng/fis-receiver.php',
//        to: '/home/lvsheng/public_html'
//    })
//});
