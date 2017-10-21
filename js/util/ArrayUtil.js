/**
 * Created by liuml on 2017/9/27.
 */

export default class ArrayUtils {
    /**
     * 更新数组,若item已存在则将其从数组中删除,若不存在则将其添加到数组
     * **/
    static updateArray(array, item) {
        for (var i = 0, len = array.length; i < len; i++) {
            var temp = array[i];
            if (item === temp) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }

    /**
     * 向数组中添加元素,若元素与存在则不添加
     * **/
    static add(array, item) {
        if (!array)return;
        for (var i = 0, l = array.length; i < l; i++) {
            if (array === array[i])return;
        }
        array.push(item);
    }

    /**
     * 将数组中指定元素移除
     * **/
    static remove(array, item) {
        if (!array)return;
        for (var i = 0, l = array.length; i < l; i++) {
            if (item === array[i]) array.splice(i, 1);
        }
    }

    /*    /!**
     * clone 数组
     * @return Array 新的数组
     * *!/
     static clone(from){
     if(!from)return [];
     let newArray=[];
     for(let i=0,l=from.length;i<l;i++){
     newArray[i]=from[i];
     }
     return newArray;
     }*/

    /**
     * 克隆一个数组
     * @param a
     */
    static clone(a) {
        return a.map((item) => {
            var obj = {};
            // for...in 语句用于遍历数组或者对象的属性（对数组或者对象的属性进行循环操作）
            //for in 遍历对象的属性
            for (var p in item) {
                obj[p] = item[p];
            }
            return obj;
        });
    }

    /**
     * 判断两个数组的是否相等
     * @return boolean true 数组长度相等且对应元素相等
     * */
    static isEqual(arr1, arr2) {
        if (!(arr1 && arr2))return false;
        if (arr1.length != arr2.length)return false;
        for (let i = 0, l = arr1.length; i < l; i++) {
            if (arr1[i] != arr2[i])return false;
        }
        return true;
    }

    /**
     * 比较两个数组内容是否完全相同
     * @param a
     * @param b
     * @returns {boolean}
     */
    static isAbsEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
}