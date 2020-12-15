//Imports
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

//Class square for flatList
class square {
  constructor(live, x, y) {
    this.live = live;
    this.x = x;
    this.y = y;
  }
}

//DATA for flatList
const DATA = [];

//Add to DATA 100(10x10) objects square
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    const obj = new square(1, j, i);
    DATA.push({obj: obj});
  }
}

//Green cells equal to live and cell black cells equal to dead
const Item = ({live}) => (
  <View style={styles.item} backgroundColor={live === 1 ? 'green' : 'black'} />
);

//Number of columns for flatList
const numColumn = 10;

//Main app
const App = () => {
  //Array with usaeState with DATA
  const [grid, setGrid] = useState(DATA);

  //When press start button it change some cell to dead
  const start = () => {
    const newSquare = grid.map((oneSquare) => {
      return {
        ...oneSquare,
        obj: {
          live: Math.floor(Math.random() * 2),
          x: oneSquare.obj.x,
          y: oneSquare.obj.y,
        },
      };
    });
    setGrid(newSquare);
  };

  /*
  The following 8 methods return 0 or 1 depending of if find one cell live
  NO: Upper left corner
  N: Above
  NE: Upper right corner
  O: Left
  E: Right
  SO: Lower left corner
  S: Down
  SE: Lower right corner
  */
  const NO = (oneSquare) => {
    var bx = oneSquare.obj.x;
    var by = oneSquare.obj.y;
    if (bx - 1 >= 0 && by - 1 >= 0) {
      const found = grid.find(
        (element) => element.obj.x === bx - 1 && element.obj.y === by - 1,
      );
      if (found.obj.live === 1) {
        return 1;
      }
    }
    return 0;
  };

  const N = (oneSquare) => {
    var bx = oneSquare.obj.x;
    var by = oneSquare.obj.y;
    if (by - 1 >= 0) {
      const found = grid.find(
        (element) => element.obj.x === bx && element.obj.y === by - 1,
      );
      if (found.obj.live === 1) {
        return 1;
      }
    }
    return 0;
  };

  const NE = (oneSquare) => {
    var bx = oneSquare.obj.x;
    var by = oneSquare.obj.y;
    if (by - 1 >= 0 && bx + 1 < numColumn) {
      const found = grid.find(
        (element) => element.obj.x === bx + 1 && element.obj.y === by - 1,
      );
      if (found.obj.live === 1) {
        return 1;
      }
    }
    return 0;
  };

  const O = (oneSquare) => {
    var bx = oneSquare.obj.x;
    var by = oneSquare.obj.y;
    if (bx - 1 >= 0) {
      const found = grid.find(
        (element) => element.obj.x === bx - 1 && element.obj.y === by,
      );
      if (found.obj.live === 1) {
        return 1;
      }
    }
    return 0;
  };

  const E = (oneSquare) => {
    var bx = oneSquare.obj.x;
    var by = oneSquare.obj.y;
    if (bx + 1 < numColumn) {
      const found = grid.find(
        (element) => element.obj.x === bx + 1 && element.obj.y === by,
      );
      if (found.obj.live === 1) {
        return 1;
      }
    }
    return 0;
  };

  const SO = (oneSquare) => {
    var bx = oneSquare.obj.x;
    var by = oneSquare.obj.y;
    if (bx - 1 >= 0 && by < numColumn - 1) {
      const found = grid.find(
        (element) => element.obj.x === bx - 1 && element.obj.y === by + 1,
      );
      if (found.obj.live === 1) {
        return 1;
      }
    }
    return 0;
  };

  const S = (oneSquare) => {
    var bx = oneSquare.obj.x;
    var by = oneSquare.obj.y;
    if (by < numColumn - 1) {
      const found = grid.find(
        (element) => element.obj.x === bx && element.obj.y === by + 1,
      );
      if (found.obj.live === 1) {
        return 1;
      }
    }
    return 0;
  };

  const SE = (oneSquare) => {
    var bx = oneSquare.obj.x;
    var by = oneSquare.obj.y;
    if (bx + 1 < numColumn && by + 1 < numColumn) {
      const found = grid.find(
        (element) => element.obj.x === bx + 1 && element.obj.y === by + 1,
      );
      if (found.obj.live === 1) {
        return 1;
      }
    }
    return 0;
  };

  const next = () => {
    const newCuadro = grid.map((oneSquare) => {
      var cont = 0;
      cont += NO(oneSquare);
      cont += N(oneSquare);
      cont += NE(oneSquare);
      cont += O(oneSquare);
      cont += E(oneSquare);
      cont += SO(oneSquare);
      cont += S(oneSquare);
      cont += SE(oneSquare);

      //When a dead cell is with live cells it revives
      if (oneSquare.obj.live === 0 && cont === 3) {
        return {
          ...oneSquare,
          obj: {
            live: 1,
            x: oneSquare.obj.x,
            y: oneSquare.obj.y,
          },
        };
      }
      //When a live cell is with less of 2 live cell it dies
      //When a live cell is with more of 3 live cell it dies
      if (oneSquare.obj.live === 1 && (cont === 3 || cont === 2)) {
        return {
          ...oneSquare,
          obj: {
            live: oneSquare.obj.live,
            x: oneSquare.obj.x,
            y: oneSquare.obj.y,
          },
        };
      } else {
        return {
          ...oneSquare,
          obj: {
            live: 0,
            x: oneSquare.obj.x,
            y: oneSquare.obj.y,
          },
        };
      }
    });
    setGrid(newCuadro);
  };

  const renderItem = ({item}) => <Item live={item.obj.live} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={grid}
        renderItem={renderItem}
        numColumns={numColumn}
        key={numColumn}
      />

      <TouchableOpacity>
        <Text style={styles.button} onPress={start}>
          Start
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.button} onPress={next}>
          Next
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.button}>Auto</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.button}>Reset</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  item: {
    paddingVertical: 20,
    paddingHorizontal: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    flex: 1,
  },
  button: {
    marginTop: 8,
    backgroundColor: 'green',
    paddingVertical: 12,
    marginVertical: 5,
    padding: 10,
    textAlign: 'center',
    width: 200,
    borderRadius: 15,
    marginLeft: 80,
    color: 'white',
  },
});

export default App;
