import React, {
  Component
} from 'react';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    // state.total_item or function calculate_item ? 
    // too much state in one component ?
    this.state = {
      filterText: "",
      addText: "",
      items: [{
        id: 1,
        content: "To Do 1",
        isRead: false,
        isDone: false,
      }, {
        id: 2,
        content: "To Do 2",
        isRead: true,
        isDone: false,
      }, {
        id: 3,
        content: "To Do 3",
        isRead: false,
        isDone: true,
      }, {
        id: 4,
        content: "To Do 4",
        isRead: true,
        isDone: true,
      }],
      iDCounter: 5,
    }
  }
  render() {
    return(
        <div className="App">
            <div className="app-content">
              <div className="banner">
                <div className="TODO">
                  <div>T</div>
                  <div>O</div>
                  <div>D</div>
                  <div>O</div>
                </div>

                <div className="search-div">
                  <SearchBar filterText={this.state.filterText}
                      onSearchInput={(e) => this.handleSearchInput(e)}
                      onClick={(e) => {this.handleSearchReset(e)}}
                  />
                  <div className="clock-div">
                  <Clock/>
                  </div>
                </div>

                
              
                <div className="add-div">
                  <div className="add-text">
                    What needs to be done ?
                  </div>
                  <AddTextBox addText={this.state.addText}
                      onAddInput={(e) => this.handleAddInput(e)}
                      onClick={(e) => {this.handleAddReset(e);
                      this.handleItemAdd(e);} }
                  />
                </div>
              
            </div>
            
            <div className="tbl-div" >
              <ToDoTable 
              onTableUpdate={() => this.handleTableUpdate()}
              onItemDelete={(e)=> this.handleItemDelete(e)}
              onItemAdd={(e)=>this.handleItemAdd(e)}
              onItemComplete={(e)=> this.handleItemComplete(e)}
              onItemRead={(e)=>this.handleItemRead(e)}
              items={this.state.items}
              addText={this.state.addText}
              filterText={this.state.filterText}
              />
            </div>
            
        </div>
      </div>
    )
    }
  handleItemRead(item) {
    this.setState(prevState => ({
      items: prevState.items.map(
        toDos => (toDos.id === item.id ? Object.assign(toDos, {
          isRead: !item.isRead
        }) : toDos)
      )
    }));
  }
  handleItemComplete(item) {
    this.setState(prevState => ({
      items: prevState.items.map(
        toDos => (toDos.id === item.id ? Object.assign(toDos, {
          isDone: !item.isDone
        }) : toDos)
      )
    }));
  }

  handleItemDelete(item) {
    let itemsCopy = [...this.state.items];
    let index = itemsCopy.indexOf(item);
    itemsCopy.splice(index, 1);
    this.setState({
      items: itemsCopy
    });
  }

  handleItemAdd() {
    // event.target.content
    // may have bug
    this.setState({iDCounter: this.state.iDCounter +1});
    let item = {
      id: this.state.iDCounter,
      content: this.state.addText,
      isRead: false,
      isDone: false,
    };
    let itemsCopy = [...this.state.items];
    
    //validate length
    if (this.state.addText.length !== 0) {
      itemsCopy.push(item);
    }
    //push ?
    this.setState({items: itemsCopy});
  }

  handleTableUpdate(event) {
    let item = {
      id: event.target.id,
      content: event.target.content,
      isRead: event.target.isRead,
      isDone: event.target.isDone,
    };
    let itemsCopy = this.state.items.splice();
    let newItems = itemsCopy.map(
      function (toDos) {
        // toDos ???
        for (let id in itemsCopy) {
          if (id === item.id.toString()) {
            itemsCopy[id] = item.value;
          };
        };
        return toDos;
      });
    this.setState({
      items: newItems
    });
  }

  handleSearchInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleSearchReset() {
    this.setState({
      filterText: ''
    });
  }

  handleAddInput(addText) {
    this.setState({
      addText: addText
    });
  }
  handleAddReset() {
    this.setState({
      addText: ''
    });
  }
  }

  class ToDoTable extends Component {

    calculate_total(items) {
      let total = 0;
      for (let key in items) {
        total += 1;
        console.log(key+'nonsense')
      }
      return total;
    }

    calculate_unread(items) {
      let total = 0;
      for (let key in items) {
        if (items[key].isRead === false)
          total += 1;
      }
      return total;
    }

    calculate_finished(items) {
      let total = 0;
      for (let key in items) {
        if (items[key].isDone === true)
          total += 1;
      }
      return total;
    }

  render() {
    let onTableUpdate = this.props.onTableUpdate;
    let itemDelete = this.props.onItemDelete;
    let filterText = this.props.filterText;
    let itemComplete = this.props.onItemComplete;
    let itemRead = this.props.onItemRead;
    return(
      <div className="todo-div">
        <div className="todo-tbl">
          <div>
            <div className="todo-th">
              <div >Check</div>
              <div>Content</div>
              <div>Read/Unread</div>
              <div>Action</div>
            </div>
            
          </div>
          <div className="todo-tr">
            {this.props.items.map(function(item) {
              if (item.content.indexOf(filterText) === -1 ){
                return null;
              }
              return (
              <ItemRow key={item.id}
              item={item}
              onTableUpdate={onTableUpdate}
              onItemDelete={(e)=>itemDelete(e)}
              onItemComplete={(e)=>itemComplete(e)}
              onItemRead={(e)=>itemRead(e)}
              />)
            })}
          </div>
        </div>
        <div className="total-div">
            <div>Finish : {this.calculate_finished(this.props.items)}</div>
            <div>Unread : {this.calculate_unread(this.props.items)}</div>
            <div>Total : {this.calculate_total(this.props.items)}</div>
        </div>
      </div>
    )
  }
}

class ItemRow extends Component {
  onDeleteEvent() {
    this.props.onItemDelete(this.props.item);
  }
  // parameter any or restrict it ?
  onCompleteEvent() {
    this.props.onItemComplete(this.props.item);
  }

  onReadEvent() {
    this.props.onItemRead(this.props.item);
  }

  render() {
    //Toggle style
      let completeValue = this.props.item.isDone? '[X]' : '[  ]' ;
      let readValue = this.props.item.isRead? 'Read' : 'Unread' ;
      let readStyle = {
        fontWeight: 'bold',
        color: 'pink'
      };
      let completeStyle = {
        color: 'green'
      }
    return(

          <div key={this.props.item.id} 
          className="item-row"
              onChange={this.props.onProductTableUpdate}
          >
            <div>
                  <input type="button" onClick={(e) => this.onCompleteEvent(e)}
                  value={completeValue}
                  style={(this.props.item.isDone) ? completeStyle : {color:'red'}}
                  className="complete-btn"
                  />
                </div>
                {/*Object.assign ??? */}
                <div>
                  <div onClick={(e)=>this.onReadEvent(e)}
                  style={(this.props.item.isRead) ? readStyle : {}}
                  className="tbl-content"
                  >
                      {this.props.item.content}
                  </div>

                </div>  
                <div>
                  {readValue}
                </div>

                <div>
                <input type="button" onClick={(e) => this.onDeleteEvent(e)}
                value="Screw it!" 
                className="delete-btn"
                />
                </div>
          </div> 
    )
  }
}

class AddTextBox extends Component {
  handleChange() {
    this.props.onAddInput(this.refs.addText.value); 
  }
  handleClick() {
    this.props.onClick();
  }
  
  render() {
    return(
      <div>
        <input type="text"
        placeholder="Rules the world . . . ?"
        value={this.props.addText}
        ref="addText"
        onChange={() => this.handleChange()}        
        />
        <button onClick={() => this.handleClick()}>
          Add
        </button>
      </div>
    );
  }
}

class SearchBar extends Component {
  handleChange() {
    this.props.onSearchInput(this.refs.filterTextInput.value);
  }
  handleClick() {
    this.props.onClick();
  }
  render() {
    return (
      <div>
        <input type="text" 
        placeholder="Search in list . . ." 
        value={this.props.filterText}
        ref="filterTextInput" 
        onChange={() => this.handleChange()}
        onClick={() => this.handleClick()}/>
      </div>

    )
  }

}

class Clock extends Component {
  constructor(props) {
      super(props);
      this.state = {
          date: new Date()
      };
  };

  tick() {
    this.setState({
      date: new Date()
    });
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),1000
    );
  }

  componentWillMount() {
    clearInterval(this.timerID);
  }

  refreshCurrentTime() {
      let now = new Date();
      this.setState({currentTime: now.toString()});
  }

  render() {
      return(
          <div>
              <div>{this.state.date.toLocaleString()}</div>
          </div>
      );
  }
}

export default App;