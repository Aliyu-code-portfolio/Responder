//import from libraries
import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, Divider, Provider} from 'react-native-paper';

//import from local components and utils

import { colors } from '../app_utils/colors';
import { paddingSizes, spacing } from '../app_utils/sizes';

const DropMenu = ({number, allow}) => {
  const [menutitle, setMenutitle] = useState('Select Department')
  const [num,setnum] = useState(null)

  //This function load numeric id of depts, allow input of password,
  //set Menu text to selected deptname, and pass id of dept to parent component
  const load=(dept)=>{
    id(dept)
    allow(true)
    setMenutitle(dept)
    
  }
  
   const id=(depart)=>{
    if(depart==='Medic'){
      number(1)
    }
    if(depart==='Fire'){
      number(2)
    }
    if(depart==='Security'){
      number(3)
    }

  }
  
 
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    
      <View style={styles.container}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button style={styles.button} onPress={openMenu}>{menutitle}</Button>}>
          <Menu.Item onPress={() =>load('Medic')} title="MEDIC" />
          <Menu.Item onPress={() =>load('Fire')} title="FIRE" />
          <Divider />
          <Menu.Item onPress={() =>load('Security')} title="SECURITY" />
        </Menu>
      </View>
    
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: paddingSizes.xxl,
    flexDirection: 'column',
    
  },
  button:{
    backgroundColor:colors.white,
    borderColor:colors.darkGray,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderBottomWidth:1,
    borderTopWidth:1,
    color:colors.lightGray,
    height:70,
    width:300,
    justifyContent:'center',
  }
});
export default DropMenu
