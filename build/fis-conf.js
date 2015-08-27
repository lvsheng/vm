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
//TODO: 写一个使用用户本地安装的tsc来编译，并且能输出.js.map文件的fis插件

fis.match('**', {
    release: '/o2o/vm/$0',
    url: '/~lvsheng/o2o/vm/$0'
});

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
