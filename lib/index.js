(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.PorCIJ = factory());
}(this, function () {

    /**
     * 获取类型
     * @param  {Object} obj 待判断的变量
     * @return {String}     变量的类型
     */
    function getType(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    };

    /**
     * 将驼峰命名转为“-”链接命名
     * @param  {String} string 驼峰命名字符串
     * @return {String}        “-”命名字符串
     */
    function nameExcange(string) {
        if(!/[A-Z]/g.test(string)) return string;

        var result, reString = string;
        // while (( result = /[A-Z]/g.exec(string) ) !== null) {
        //     reString = reString.replace(result[0], (( result.index === 0 ? '' : '-' ) + result[0].toLowerCase()))
        // };
        //
        for(var i = 0; i < reString.length; i ++) {
            var currentWord = reString[i];
            if(/[A-Z]/.test(currentWord)) {
                reString = reString.replace(currentWord, (( i === 0 ? '' : '-' ) + currentWord.toLowerCase()));
            }
        }

        return reString;
    };

    /**
     * 替换字符串中符合某正则表达式的内容
     * @param  {String} string     待处理字符串
     * @param  {RegExp} fromSthReg 要被替换的正则表达式
     * @param  {String} toSthStr   要替换的文字
     * @return {Object}            处理完毕的结果，res为处理结果，success为是否处理
     */
    function stringReplaceSth(string, fromSthReg, toSthStr) {
        if(!fromSthReg.test(string)) return {
            res: string,
            success: false
        };

        return {
            res: string.replace(fromSthReg, toSthStr),
            success: true
        };
    };

    function everyValInObjIsNotObj(obj) {
        var keys = Object.keys(obj),
            except = {},
            everyRes = true;
        var result = keys.forEach(function(key) {
            var item = obj[key],
                res = (getType(item) !== 'object');

            everyRes = everyRes && res;

            !everyRes && (except[key] = item);
            return everyRes;
        });

        return {
            result: result,
            except: except
        };
    }

    function PorCIJ(obj) {
        this.init(obj);
    };
    PorCIJ.prototype = {
        init: function(obj) {
            this.$settings = obj;
            this.$styleTag = document.createElement('style');
            this.$styleNamePath = [];
            this.$styleTextArr = [];

            this.rootLoop(this.$settings);

            var styleText = this.$styleTextArr.join('');

            this.$styleTag.innerText = styleText;

            document.head.append(this.$styleTag);
        },
        rootLoop: function(cssObj) {
            this.leaveNum ++;
            var keys = Object.keys(cssObj),
                that = this;

            keys.forEach(function(key) {
                that.buildCssItem( cssObj[key], key );
            });
        },
        buildCssItem: function(cssItem, cssName) {
            var styleNamePathLastIndex = this.$styleNamePath.length - 1,
                srs = stringReplaceSth(cssName, /^&/, this.$styleNamePath[styleNamePathLastIndex]),
                storePopName = '';
            cssName = srs.res;

            if(srs.success) {
                storePopName = this.$styleNamePath.slice(styleNamePathLastIndex)[0];
                this.$styleNamePath.splice(styleNamePathLastIndex, 1, cssName);
            } else {
                this.$styleNamePath.push(cssName);
            };

            var rebuildFullName = this.$styleNamePath.join(' '),
                styleItem = this.objToStyleStr(cssItem, rebuildFullName);
            this.$styleTextArr.push(styleItem);

            var testValAllObj = everyValInObjIsNotObj(cssItem);
            if(!testValAllObj.result) {
                this.rootLoop(testValAllObj.except, true);
            };

            this.$styleNamePath.pop();
            if(!!storePopName) {
                this.$styleNamePath.push(storePopName);
                storePopName = '';
            };
        },
        objToStyleStr: function(obj, name) {
            var keys = Object.keys(obj),
                resStr = '$name { $styleStr }',
                styleStr = '',
                that = this;
            keys.forEach(function(key) {
                var storeSubStyleArr = []
                if(getType(obj[key]) !== 'object') {
                    var keyRebuild = nameExcange(key);
                    styleStr += (keyRebuild + ':' + obj[key] + '; ');
                };
            });

            resStr = resStr.replace('$name', name);
            resStr = resStr.replace('$styleStr', styleStr);

            return resStr;
        }
    };

    return PorCIJ;

}));
