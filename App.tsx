import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const  {width} = Dimensions.get('window')

const pinLenght = 4;
const pinContainerSize = width/2;
const pinMaxSize = pinContainerSize / pinLenght;
const pinSpacing = 10;
const pinSize = pinMaxSize - pinSpacing*2;


const dialPad = [1,2,3,4,5,6,7,8,9, '',0, 'Del'];
const dialPadSize = width * .2;
const dialPadTextSize = dialPadSize * .4;
const _spacing = 20;



function DialPad({onPress}: {onPress: (item: typeof dialPad[number])=> void  })
 {
  return <FlatList
    numColumns= {3}
    data={dialPad}
    style={{flexGrow: 0}}
    scrollEnabled={false}
    columnWrapperStyle= {{gap: _spacing}}
    contentContainerStyle= {{gap: _spacing}}
    renderItem={({item}) => {
      return  <TouchableOpacity
      onPress={() => {
        onPress(item)
      }}>

        <View
        style={{
          width: dialPadSize,
          height: dialPadSize,
          borderRadius: dialPadSize,
          borderWidth:  2,
          borderColor: 'black',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
          <Text
          style={{
            fontSize: dialPadTextSize
          }}
          > {item} </Text>
        </View>
      </TouchableOpacity>
    }}
  />
}

export default function App() {
  const [code, setCode] = useState <number[]> ([]);
 
  return (
    <View style={styles.container}>
      <View
        style={{flexDirection: 'row', 
        gap: pinSpacing*2,
        marginBottom: _spacing*2,
        height: pinSize*2,
        alignItems:'flex-end'
        }}>

        {[...Array(pinLenght).keys()].map( i => {
          const isSelected = !!code[i]
          return <MotiView
          key={`pin-${i}`}
          style={{
            width: pinSize,
            borderRadius: pinSize,
            backgroundColor: 'red'
          }}
          transition={{
            type: 'timing',
            duration: 150
          }}
          animate={{
            height: isSelected ? pinSize : 2,
            marginBottom: isSelected ? pinSize/2 : 0,
          }}
          />
        })}
      </View>

      <DialPad
       onPress={(item) => {
        if (item === 'Del') {
          setCode(prewCode => prewCode.slice(0, prewCode.length -1))
        } else if (typeof item === 'number') {
          if (code.length === pinLenght) return
          setCode(prevCode => [...prevCode, item])
        }
       }}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
