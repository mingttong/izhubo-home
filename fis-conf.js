/**
 * @file FIS 配置
 * @author
 */

fis.config.set('namespace', 'home');

// chrome下可以安装插件实现livereload功能
// https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
fis.config.set('livereload.port', 35729);

/*
 debug 模式下的运行配置
 */
fis.media('debug').match('*', {
    optimizer: null,
    useHash: false,
    deploy: fis.plugin('http-push', {
        // receiver: 'http://local.izhubo.org/yog/upload',
        receiver: 'http://local.izhubo.org:8085/yog/upload',
        to: '/'
    })
});

/*
 server下的.ts和.js文件都经过typescript插件转换成.js文件
 其实就是转成ES5
 */
fis.match('server/{**.ts,**.js}', {
    parser: fis.plugin('typescript', {
        module: 1,
        target: 2
    }),
    rExt: 'js'
});

/*
 使用commonjs模块管理.js和.vue文件
 */
fis.hook('commonjs', {
    baseUrl: './app',
    extList: ['.js', '.vue']
});

/*
 client/app/下的所有.js文件转为ES5
 */
fis.match('client/app/**.js', {
    parser: fis.plugin('typescript'),
    rExt: 'js',
    isMod: true,
    useSameNameRequired: true
});

/*
 client/app/下的所有.js文件发布到static目录下
 */
fis.match('(client/app/**.js)', {
    isMod: true,
    useSameNameRequired: true,
    release: '${static}/$1'
});

fis.match('(client/static/ui/**.js)', {
    isMod: true,
    useSameNameRequired: true,
    release: '${static}/ui/$1'
});

fis.match('server/conf/(page/**.{json,conf})', {
    optimizer: null,
    useHash: false,
    postprocessor: null,
    release: '${config}/$1'
});

fis.match('server/(plugin/**)', {
    optimizer: null,
    useHash: false,
    postprocessor: null,
    release: '$1'
});

/*
 client/app/目录下的.vue文件解析
 */
fis.match('client/app/**.vue', {
    isMod: true,
    rExt: 'js',
    useSameNameRequired: true,
    parser: fis.plugin('vue-component', {
        cssScopeFlag: 'izhubo'
    })
});

/*
 vue组件中产出的css处理
 */
fis.match('client/app/(**.css)', {
    release: '${static}/css/$1'
});

/*
 vue组件中的less片段处理
 */
fis.match('client/app/**.vue:less', {
    rExt: 'css',
    parser: fis.plugin('less')
});

/*
 vue组件中js片段处理
 */
fis.match('client/(app/**.vue:js)', {
    parser: fis.plugin('typescript'),
    release: '${static}/$1'
});

fis.enableNPM({
    autoPack: false // 使用autoPack可以自动将依赖的npm组件打包合并
});

// if (fis.IS_FIS3) {
//     fis.media('debug').match('*', {
//         optimizer: null,
//         useHash: false,
//         deploy: fis.plugin('http-push', {
//             receiver: 'http://127.0.0.1:8085/yog/upload',
//             to: '/'
//         })
//     });
//     fis.media('debug-prod').match('*', {
//         deploy: fis.plugin('http-push', {
//             receiver: 'http://127.0.0.1:8085/yog/upload',
//             to: '/'
//         })
//     });
// }
// else {
//     fis.config.set('deploy', {
//         debug: {
//             to: '/',
//             // yog2 默认的部署入口，使用调试模式启动 yog2 项目后，这个入口就会生效。IP与端口请根据实际情况调整。
//             receiver: 'http://127.0.0.1:8085/yog/upload'
//         }
//     });
// }
