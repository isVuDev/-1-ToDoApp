import React, { Component } from 'react';
import './App.css';
/*
function calculate_total(items) 
function calculate_unread(items) {

}
function calculate_finished(items) {

}
*/
class App extends Component {
  constructor(props) {
    super(props);
    // state.total_item or function calculate_item ? 
    // too much state in one component ?
    this.state = {};
    this.state.filterText = "" ;
    this.state.addText = "" ;
    this.state.items = [{
      content: "To Do 1",
      isRead: false,
      isDone: false,
    },{
      content: "To Do 2",
      isRead: true,
      isDone: false,
    },{
      content: "To Do 3",
      isRead: false,
      isDone: true,
    },{
      content: "To Do 4",
      isRead: true,
      isDone: true,
    }];

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
              <div className="clock-div">
              <Clock/>
              </div>
            </div>
            
            <div className="tbl-div" >
              <ToDoTable 
              onTableUpdate={() => this.handleTableUpdate()}
              onItemDelete={(e)=> this.handleItemDelete(e)}
              onItemAdd={(e)=>this.handleItemAdd(e)}
              onItemCompelete={(e)=> this.handleItemCompelete(e)}
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

  handleItemRead(item){
    item.isRead = !item.isRead;
    this.setState(this.state.items);
  }

  handleItemCompelete(item) {
    item.isDone = !item.isDone;
    this.setState(this.state.items);
  }

  handleItemDelete(item) {
    var index = this.state.items.indexOf(item);
    this.state.items.splice(index,1);
    this.setState(this.state.items);
  }

  handleItemAdd(event) {
    // event.target.content
    var item = {
      content: this.state.addText,
      isRead: false,
      isDone: false,
    };
    //validate length
    if (this.state.addText.length !== 0) {
      this.state.items.push(item);
    }
    //push ?
    this.setState(this.state.items);
  }

  handleTableUpdate(event) {
    var item = {
      content: event.target.content,
      isRead: event.target.isRead,
      isDone: event.target.isDone,
    };
    var items = this.state.items.splice();
    var newItems = items.map(
      function(itemsList) {
        for (var key in itemsList) {
          if (key === item.content.toString()) {
            itemsList[key] = item.value; 
          };
        };
        return itemsList;
      });
    this.setState({items: newItems});
    //console.log(this.state.items);
  }

  handleSearchInput(filterText) {
    this.setState({filterText: filterText});
  }
  
  handleSearchReset() {
    this.setState({filterText: ''});
  }

  handleAddInput(addText) {
    this.setState({addText: addText});
  }
  handleAddReset() {
    this.setState({addText: ''});
  }
}

class ToDoTable extends Component {
  
  calculate_total(items){
    var total = 0;
    for (var key in items) {
      total+=1;
      console.log(key);
    }
    return total;
  }
  
  calculate_unread(items){
    var total = 0;
    for (var key in items) {
      if (items[key].isRead === false)
        total+=1;
    }
    return total;
  }

  calculate_finished(items){
    var total = 0;
    for (var key in items) {
      if (items[key].isDone === true)
      total+=1;
    }
    return total;
  }

  render() {
    var onTableUpdate = this.props.onTableUpdate;
    var itemDelete = this.props.onItemDelete;
    var filterText = this.props.filterText;
    var itemCompelete = this.props.onItemCompelete;
    var itemRead = this.props.onItemRead;
    return(
      <div className="todo-div">
        <table className="todo-tbl">
          <thead>
            <tr>
              <th className="todo-th">Check</th>
              <th>Content</th>
              <th>Read/Unread</th>
              <th>Action</th>
            </tr>
            
          </thead>
          <tbody>
            {this.props.items.map(function(item) {
              if (item.content.indexOf(filterText) === -1 ){
                return null;
              }
              return (
              <ItemRow key={item.content}
              item={item}
              onTableUpdate={onTableUpdate}
              onItemDelete={(e)=>itemDelete(e)}
              onItemCompelete={(e)=>itemCompelete(e)}
              onItemRead={(e)=>itemRead(e)}
              />)
            })}
          </tbody>
        </table>
        <div>
            <p>Total : {this.calculate_total(this.props.items)}</p>
            <p>Unread : {this.calculate_unread(this.props.items)}</p>
            <p>Finish : {this.calculate_finished(this.props.items)}</p>
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
  onCompeleteEvent() {
    this.props.onItemCompelete(this.props.item);
  }

  onReadEvent() {
    this.props.onItemRead(this.props.item);
  }

  render() {
    //Toggle style
      var compeleteValue = this.props.item.isDone? '[X]' : '[  ]' ;
      var readValue = this.props.item.isRead? 'Read' : 'Unread' ;
      var readStyle = {
        fontWeight: 'bold',
        color: 'pink'
      };
      var compeleteStyle = {
        color: 'green'
      }
    return(

          <tr key={this.props.item.index} 
          className="item-row"
              onChange={this.props.onProductTableUpdate}
          >
                <td>
                  <input type="button" onClick={(e) => this.onCompeleteEvent(e)}
                  value={compeleteValue}
                  style={(this.props.item.isDone) ? compeleteStyle : {color:'red'}}
                  className="compelete-btn"
                  />
                  {/*
                    //button trim off space 
                  <button onClick={(e)=>this.onCompeleteEvent(e)}
                  className="compelete-btn">
                  {this.props.item.isDone? '[X]' : '[   ]'}
                  </button>
                    //view
                  {this.props.item.isDone.toString()}
                  */}
                </td>
                {/*Object.assign ??? */}
                <td>
                  <text onClick={(e)=>this.onReadEvent(e)}
                  style={(this.props.item.isRead) ? readStyle : {}}
                  className="tbl-content"
                  >
                      {this.props.item.content}
                  </text>

                </td>  
                <td>
                  {readValue}
                </td>

                <td>
                <input type="button" onClick={(e) => this.onDeleteEvent(e)}
                value="Screw it!" 
                className="delete-btn"
                />
                </td>
          </tr> 
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
      var now = new Date();
      this.setState({currentTime: now.toString()});
  }

  render() {
      return(
          <div>
              <h4>{this.state.date.toLocaleString()}</h4>
          </div>
      );
  }
}

export default App;
