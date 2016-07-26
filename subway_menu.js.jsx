    SubwayMenu = React.createClass({
        getInitialState: function () {
          return {
            item: null,
            bread: null,
            size: null,
            total: 0
          };
        },

        handleChange: function (e) {
          var name = e.target.name;
          var obj = {};
          obj[name] = e.target.value;
          var price = parseInt(e.target.value);
          obj['total'] = price;
          if( this.state.size == '2'){
            obj['total'] = price * 2;            
          }
          this.setState(obj);
        },
        handleSize: function (e) {         
           var total = parseInt(this.state.item);
           var size = e.target.value;
           if(size == '2'){
             total = total * 2;
           }
           this.setState({ total: total, size: size });         
        },
        handleToppings: function (e) {
          var value = parseInt(e.target.value);
          if( e.target.checked == true ) {
            var total = parseInt(this.state.total) + value;
            this.setState({total: total});
          }else{
            var total = parseInt(this.state.total) - value;
            this.setState({total: total});
          }
        },

        render: function () {
          return (
            <div>
              <Item handleChange={this.handleChange} handlePrice={this.handlePrice}/>
              <Bread handleChange={this.handleChange}/>
              <BreadSize handleSize={this.handleSize}/>
              <Sauces handleChange={this.handleChange}/>
              <Toppings handleToppings={this.handleToppings}/>
              <p>Total Bill: {this.state.total}</p>
            </div>
          );
        }
      });

      var Item = React.createClass({
        getInitialState: function () {
          return {
            options: [
              { value: null, name: 'Select' },
              { value: '100', name: 'chicken', item_name: 'Chicken (100 rs)' },
              { value: '400', name: 'mutton', item_name: 'Mutton (400 rs)' }
            ]
          };
        },

        render: function () {
          var createItem = function (item, key) {
            return <option key={key} value={item.value}>{item.item_name}</option>;
          };
          return (
            <div>
              <label>Items: </label>
              <select onChange={this.props.handleChange} value={this.state.item} name='item'>
                {this.state.options.map(createItem)}
              </select>
            </div>
          );
        }
      });
      var Bread = React.createClass({
        getInitialState: function () {
          return {
            options: [
              { value: null, name: 'Select' },
              { value: 'italian', name: 'Italian' },
              { value: 'wheat', name: 'wheat' },
              { value: 'white', name: 'white'}
            ]
          };
        },

        render: function () {
          var createItem = function (item, key) {
            return <option key={key} value={item.value}>{item.name}</option>;
          };
          return (
            <div>
              <label>Breads: </label>
              <select onChange={this.props.handleChange} value={this.state.item} name='item'>
                {this.state.options.map(createItem)}
              </select>
            </div>
          );
        }
      });
      
       var BreadSize = React.createClass({
        getInitialState: function () {
          return {
            options: [
              { value: '1', name: '6 Inch' },
              { value: '2', name: '12 Inch' }
            ]
          };
        },
        render: function () {
          var createItem = function (item, key) {
            return <option key={key} value={item.value}>{item.name}</option>;
          };
          return (
            <div>
              <label>Size: </label>
              <select onChange={this.props.handleSize} value={this.state.item} name='item'>
                {this.state.options.map(createItem)}
              </select>
            </div>
          );
        }
      });
     
      var Sauces = React.createClass({
        getInitialState: function () {
          return {
            options: [
              { value: 'sweet_honey', name: 'sweet honey'},
              { value: ' mustardy_flavor', name: ' mustardy flavor'},
              { value: 'tomato_sauce', name: 'Tomato sauce'}
            ]
          };
        },

        render: function () {
          return (
            <div>
               <p>Sauces :</p>
               <input type="checkbox" name="sweet_honey" value="sweet_honey"/>Sweet honey
               <input type="checkbox" name="mustardy_flavor" value="mustardy_flavor"/>Mustardy flavor
               <input type="checkbox" name="tomato_sauce" value="tomato_sauce"/>Tomato sauce
             
            </div>
          );
        }
      });
       var Toppings = React.createClass({
        render: function () {
          return (
            <div>
               <p>Toppings :</p>
               <input type="checkbox" name="pepper_jack" value="40" onChange={this.props.handleToppings}/>Pepper Jack (40 rs)
               <input type="checkbox" name="swiss" value="50" onChange={this.props.handleToppings}/>Swiss (50 rs)
               <input type="checkbox" name="cheddar" value="60" onChange={this.props.handleToppings}/>Cheddar (60 rs)
             
            </div>
          );
        }
      });

ReactDOM.render(
  <SubwayMenu />,
  document.getElementById('container')
);

