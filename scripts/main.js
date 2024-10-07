const { createApp } = Vue;

createApp({
    data() {
        return {
            contacts: [
                {
                    name: 'Michele',
                    avatar: 'https://picsum.photos/id/10/200',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: 'https://picsum.photos/id/20/200',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: 'https://picsum.photos/id/30/200',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: 'https://picsum.photos/id/40/200',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: 'https://picsum.photos/id/50/200',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: 'https://picsum.photos/id/60/200',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: 'https://picsum.photos/id/70/200',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: 'https://picsum.photos/id/80/200',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            selectedContactIndex: null,

            messageInputed: '',

            userFilter: ''
        }
    },

    methods: {
        getMessageTime(contactIndex, messageIndex) {
            const dateAndTimeTuple = this.contacts[contactIndex].messages[messageIndex].date.split(' ');
            const timeSplitted = dateAndTimeTuple[1].split(':');
            return `${timeSplitted[0]}:${timeSplitted[1]}`;
        },

        getCurrentDateString() {
            const currentDate = new Date();
            return ('0' + currentDate.getDate()).slice(-2) + '/' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + `/${currentDate.getFullYear()} ` + ('00' + currentDate.getHours()).slice(-2) + ':' + ('00' + currentDate.getMinutes()).slice(-2) + ':' + ('00' + currentDate.getSeconds()).slice(-2);
        },

        pushNewMessage(messageString, contactIndex, isRecived) {
            const newMessage = {
                date: this.getCurrentDateString(),
                message: messageString,
                status: isRecived ? 'recived' : 'sent'
            };
            const contact = this.contacts[contactIndex];
            contact.messages.push(newMessage);
            this.contacts.splice(contactIndex, 1);
            this.contacts.unshift(contact);
        },

        sendNewMessage() {
            if (/\S/i.test(this.messageInputed)) {
                this.pushNewMessage(this.messageInputed, this.selectedContactIndex, false)
                this.selectedContactIndex = 0;
                this.messageInputed = '';
                this.placeholderNewMessageCall();
            } else {
                this.messageInputed = '';
            }
        },

        getNewMessage(contactIndex) {
            axios.get('https://flynn.boolean.careers/exercises/api/random/sentence')
                .then(callReturn => {
                    this.pushNewMessage(callReturn.data.response, contactIndex, true);
                    if (this.selectedContactIndex === contactIndex) {
                        this.selectedContactIndex = 0;
                    } else {
                        this.selectedContactIndex = this.selectedContactIndex > contactIndex ? this.selectedContactIndex : ++this.selectedContactIndex;
                    }
                });
        },

        placeholderNewMessageCall() {
            setTimeout(() => {
                this.getNewMessage(0);
            }, 1000);
        },

        filterContactList() {
            this.contacts.forEach(contact => {
                contact.visible = contact.name.toLowerCase().includes(this.userFilter.toLowerCase()) ? true : false;
            });
        }
    },

    computed: {
        getSelectedContactLastSentMessageTime() {
            if (this.selectedContactIndex === null) {
                return false;
            } else {
                let lastMessageIndex = this.contacts[this.selectedContactIndex].messages.findLastIndex(message => message.status === 'received');
                if (lastMessageIndex === -1) {
                    return 'No messages recived';
                } else {
                    return this.getMessageTime(this.selectedContactIndex, lastMessageIndex);
                }
            }
        }
    }
}).mount('#app');