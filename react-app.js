/*
 * Actions
 */

function updateNewContact(contact) {
  setState({ newContact: contact });
}

/*
 * State
 */

// The app's complete current state
var state = {};

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
    Object.assign(state, changes);

    ReactDOM.render(
        React.createElement(ContactView, Object.assign({}, state, {
          onNewContactChange: updateNewContact
        })),
        document.getElementById('react-app')
    );
}

var ContactItem = React.createClass ({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired,
        description: React.PropTypes.string
    },

    render: function () {
        return (
            React.createElement('li', {className: "ContactItem"},
                React.createElement ('h2', {}, this.props.name),
                React.createElement ('a', {href: 'mailto:'+this.props.email}, this.props.email),
                React.createElement ('p', {}, this.props.description)
            )
        )
    }
})

var ContactForm = React.createClass ({

    propTypes: {
        value: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    },

    render: function () {

        var contact = this.props.value;
        var onChange = this.props.onChange;
        var onSubmit = this.props.onSubmit;

        return (
            React.createElement ('form', {
                    className: "ContactForm",
                    onSubmit: function (event) {
                        onSubmit (contact)
                        event.preventDefault()
                    }},
                React.createElement ('input' , {
                    type: 'text',
                    value: contact.name,
                    placeholder: 'name',
                    onChange: function (event) {
                        onChange (Object.assign ({}, contact, {name: event.target.value}))
                    }}),
                React.createElement ('input', {
                    type: 'text',
                    value: contact.email,
                    placeholder: 'e-mail',
                    onChange: function (event) {
                        onChange (Object.assign ({}, contact, {email: event.target.value}))
                    }}),
                React.createElement ('textarea', {
                    value: contact.description,
                    placeholder: 'description',
                    onChange: function (event) {
                        onChange (Object.assign ({}, contact, {description: event.target.value}))
                    }}),
                React.createElement ('button', {
                    type: 'submit'
                    },
                    'Click!')
            )
        )
    },
})

var ContactView = React.createClass ({

    propTypes: {
        contacts: React.PropTypes.array.isRequired,
        newContact: React.PropTypes.object.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    },

    render: function () {

        var listElements = this.props.contacts
            .filter(function(contact) { return contact.email; })
            .map(function(contact) {
                return React.createElement (ContactItem, contact)
            })

        return (
            React.createElement ('div', {className: "ContactView"},
                React.createElement ('h1', {}, "Contacts"),
                React.createElement ('ul', {}, listElements),
                React.createElement (ContactForm, { value: this.props.newContact, onChange: this.props.onNewContactChange, onSubmit: this.props.onSubmit})
            )
        )
    }
})

var contacts = [
    {key: 1, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Developer"},
    {key: 2, name: "Jim", email: "jim@example.com", description: "A contact"},
    {key: 3, name: "Joe"},
    {key: 4, name: "Mariano Korman", email: "mkormanc@gmail.com", description: "Full-stack Developer"},
]

var newContact = {name: "", email: "", description: ""}

function AddNewContact (contact) {
    console.log ('Adding a new contact!')
    contacts.push (Object.assign ({}, contact, {key: contacts.length + 1}))
    setState ({contacts: contacts})
}

setState ({ contacts: contacts, newContact: newContact, onSubmit: AddNewContact })
