import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            newMessage: "",
            newAuthor: "",
        };
    }

    async componentDidMount(){
        const quotes = (await axios.get('http://localhost:8081/quotes')).data;
        this.setState({
            quotes
        });
    }

    async insertQuote(quote){
        const quotes = (await axios.post('http://localhost:8081/quote')).data;
        this.setState({
            quotes
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.newMessage) return;
        this.setState({
            quotes: this.state.quotes.concat({
                message: this.state.newMessage,
                author: this.state.newAuthor === "" ? "anonymous" : this.state.newAuthor
            })
        })
    }

    handleNewQuote(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    removeQuote(index) {
        this.setState({quotes: this.state.quotes.filter((q, i) => i !== index)})
    }

    render() {
        if (!this.state.quotes) {
            return (<p>loading data....</p>)
        }
        return (
            <div>
                <ul>
                    {this.state.quotes.map(q => <Quotation key={q._id} {...q} removeQuote= {()=>removeQuote(q._id)}/>)}
                </ul>
                <hr/>
                <Form handleSubmit={e => this.handleSubmit(e)} handleNewQuote={e => this.handleNewQuote(e)}/>
            </div>
        )
    }
}

class Quotation extends React.Component {
    render() {
        const styleMessage = {color: 'red'}, styleAuthor = {color: 'green'};
        return (
            <li onClick={this.props.removeQuote}>
                <span style={styleMessage}> {this.props.message} </span>
                <span style={styleAuthor}> ({this.props.author})</span>
            </li>
        );
    }
}

class Form extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label htmlFor="newMessage">new quote</label>
                <textarea id="newMessage" placeholder="enter your message"
                          onChange={this.props.handleNewQuote}/>
                <br/>
                <label htmlFor="newAuthor">author</label>
                <input id="newAuthor" placeholder="author name"
                       onChange={this.props.handleNewQuote}/>
                <input type="submit" value="OK"/>
            </form>
        )
    }
}

export default App;

