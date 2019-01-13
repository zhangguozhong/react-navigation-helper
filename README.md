# react-navigation-props-helper


## 安装

yarn add react-navigation-props-helper 或 npm install --save react-navigation-props-helper


## 怎么使用？

### NavigatorPush

1、跳转路由：NavigatorPush.navigate('TestPage', {userName:'userName', pwd:'pwd'}); //跳转路由
2、回退路由：
3、设置参数：NavigatorPush.setParameters({test:{key:'value'}}); //当前路由设置参数

```javascript

import {NavigatorPush} from 'react-navigation-props-helper';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RootView ref={navigatorRef => { NavigatorPush.setTopLevelNavigator(navigatorRef); }}/> //保存navigator的引用
        {/*<VideoPlayScreen url={'http://vodstztfqk4.vod.126.net/vodstztfqk4/3c901b47-0fc0-4490-9c2d-76b13465d4c4.mp4'}/>*/}
      </View>
    );
  }
}

```

### withMappedNavigationProps

```javascript

import React,{Component} from 'react';
import { View,StatusBar } from 'react-native';
import {observer} from 'mobx-react';
import { NavigatorPush,withMappedNavigationProps } from 'react-navigation-props-helper'

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
        return(
            <View style={{flex:1}}>
                <StatusBar hidden={false} barStyle={'dark-content'} translucent={false} backgroundColor={'white'}/>
            </View>
        );
    }
}
```


## 说明须知

如果你使用了mobx的observer注解，解决办法就是把@observer放下面，以免mobx失效；
react-navigation版本3.0.0以上。
