/**
 * Created by Lenovo on 2017/1/19.
 */

var app = angular.module("app", []);
app.controller('watchController',function($scope){
    $scope.text = '初始值';
    $scope.count1 = '多监听1';
    $scope.count2 = '多监听2';
    $scope.array = [{name:'张三'},{name:'李四'},{name:'王五'}];
    $scope.old = '旧值';

    /**
     * 单个监听
     * */
    $scope.$watch('text',function warningResult(){
        alert('单个监听已经改变');
    })

    /*
    * 同时监听多个变量
    * */
    $scope.$watch('count1+count2',function warningResult(){
        alert('多个监听已经改变');
    })

    /*
    * 对象或数组监听
    * */
    $scope.$watch('array',function warningResult(){
        alert('监听数组或者对象已经改变');
    },true)


    /*
    * 观察新旧值
    * */
    $scope.$watch('old',function warningResult(newValue,oldValue,scope){
        alert(newValue);
        alert(oldValue);
        alert('scope:'+scope.text);
    })
})


