# react-navigation-helper


## 怎么使用？

```javascript

import { NavigatorPush } from 'react-navigation-helper'

1、 <RootView ref={navigatorRef => { NavigatorPush.setTopLevelNavigator(navigatorRef); }}/>  //保存navigator的引用

2、 NavigatorPush.navigate('TestPage', {userName:'userName', pwd:'pwd'}); //跳转路由

```


```javascript

TestPage

import React,{Component} from 'react';
import {
    View,StatusBar
} from 'react-native';
import {observer} from 'mobx-react';

import { NavigatorPush,withMappedNavigationProps,withMappedNavigationAndConfigProps } from 'react-navigation-helper'

@withMappedNavigationProps
@observer
export default class TestPage extends Component {

    componentDidMount() {
        NavigatorPush.setParameters({test:{key:'value'}}); //当前路由设置参数
        console.log('componentDidMount');
    }
    render() {
        const {userName, pwd,test,navigation} = this.props;
        console.log('render:',userName, pwd,test,navigation);
        console.log('componentName',this.constructor.name);

        return(
            <View style={{flex:1}}>
                <StatusBar hidden={false} barStyle={'dark-content'} translucent={false} backgroundColor={'white'}/>
            </View>
        );
    }
}

```


## 解释一下

如果你使用了mobx的observer注解，解决办法就是把@observer放下面，以免mobx失效。