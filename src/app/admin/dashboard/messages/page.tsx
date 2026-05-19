'use client'

import { useState } from 'react'
import { 
  MessageCircle, Mail, MailOpen, Trash2, Search, CheckCircle, 
  ChevronRight, Reply, Calendar, User, Phone, Send
} from 'lucide-react'

interface Message {
  id: string | number
  sender_name: string
  sender_email: string
  sender_phone: string
  subject: string
  content: string
  date: string
  read: boolean
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      sender_name: 'Ahmed Hassan', 
      sender_email: 'ahmed@gmail.com', 
      sender_phone: '+253 77 12 34 56', 
      subject: 'Problème de paiement abonnement VIP', 
      content: 'Bonjour, j\'ai essayé de souscrire à la formule premium VIP avec mon compte Waafi Pay, mais l\'opération a échoué alors que mon compte a été débité. Merci de m\'aider rapidement.', 
      date: '19 Mai 2026, 14:32', 
      read: false 
    },
    { 
      id: 2, 
      sender_name: 'Mariam Djama', 
      sender_email: 'mariam@outlook.com', 
      sender_phone: '+253 77 23 45 67', 
      subject: 'Proposition de partenariat publicitaire', 
      content: 'Bonjour, nous sommes une agence de location de voitures à Balbala et nous aimerions louer une bannière publicitaire sur la page d\'accueil de WAYCAN. Quels sont vos tarifs mensuels ?', 
      date: '18 Mai 2026, 09:15', 
      read: true 
    },
    { 
      id: 3, 
      sender_name: 'Kamil Aden', 
      sender_email: 'kamil@hotmail.com', 
      sender_phone: '+253 77 34 56 78', 
      subject: 'Signalement d\'une fausse annonce de vente', 
      content: 'L\'annonce pour le Land Cruiser numéro #4521 est une arnaque. Le vendeur demande un acompte avant de montrer le véhicule et a éteint son téléphone. Veuillez supprimer cette annonce.', 
      date: '17 Mai 2026, 18:40', 
      read: false 
    }
  ])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [search, setSearch] = useState('')
  const [filterRead, setFilterRead] = useState('all')
  const [replyText, setReplyText] = useState('')
  const [sendingReply, setSendingReply] = useState(false)

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.sender_name.toLowerCase().includes(search.toLowerCase()) || 
                          msg.subject.toLowerCase().includes(search.toLowerCase())
    if (filterRead === 'read') return matchesSearch && msg.read
    if (filterRead === 'unread') return matchesSearch && !msg.read
    return matchesSearch
  })

  const handleSelectMessage = (msg: Message) => {
    setSelectedMessage(msg)
    // Mark as read automatically when opened
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m))
  }

  const handleDeleteMessage = (id: string | number) => {
    if (!confirm("Voulez-vous supprimer définitivement ce message ?")) return
    setMessages(prev => prev.filter(m => m.id !== id))
    if (selectedMessage?.id === id) setSelectedMessage(null)
  }

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim()) return

    setSendingReply(true)
    setTimeout(() => {
      alert("Votre réponse a été envoyée par email avec succès !")
      setReplyText('')
      setSendingReply(false)
      setSelectedMessage(null)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-text-main flex items-center gap-2">
          <MessageCircle className="w-8 h-8 text-primary" />
          Messagerie administrative
        </h1>
        <p className="text-text-muted mt-1">Lisez et répondez aux messages de support, aux demandes de partenariat et aux signalements des utilisateurs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* Left Side: Message List (3/5 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Chercher expéditeur, sujet..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent w-full text-xs"
              />
            </div>
            <select
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value)}
              className="py-2 px-3 border border-gray-200 rounded-xl text-xs bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="all">Tous</option>
              <option value="unread">Non lus</option>
              <option value="read">Lus</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-xs">
                Aucun message trouvé
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div 
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`p-4 cursor-pointer transition-all flex items-start gap-3 hover:bg-neutral/40 ${
                    selectedMessage?.id === msg.id ? 'bg-accent/5 border-l-4 border-accent' : ''
                  } ${!msg.read ? 'font-bold bg-blue-50/10' : ''}`}
                >
                  <div className="mt-1 flex-shrink-0">
                    {msg.read ? (
                      <MailOpen className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Mail className="w-5 h-5 text-accent animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="text-xs text-text-main truncate max-w-[120px]">{msg.sender_name}</h4>
                      <span className="text-[10px] text-text-muted font-normal">{msg.date.split(',')[0]}</span>
                    </div>
                    <p className="text-xs text-text-main mt-0.5 truncate">{msg.subject}</p>
                    <p className="text-[10px] text-text-muted mt-1 truncate font-normal">{msg.content}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 mt-2 flex-shrink-0" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Message Detail (2/5 cols) */}
        <div className="lg:col-span-3">
          {selectedMessage ? (
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 space-y-6 animate-fade-in">
              <div className="flex justify-between items-start border-b pb-4">
                <div>
                  <h3 className="font-extrabold text-text-main text-lg leading-snug">{selectedMessage.subject}</h3>
                  <span className="inline-flex items-center gap-1 text-xs text-text-muted mt-1.5"><Calendar className="w-3.5 h-3.5" /> Reçu le {selectedMessage.date}</span>
                </div>
                <button 
                  onClick={() => handleDeleteMessage(selectedMessage.id)}
                  className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
                  title="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Sender Details */}
              <div className="bg-neutral/40 rounded-xl p-4 border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-text-main">
                  <User className="w-4 h-4 text-accent" />
                  <span className="font-bold">De : {selectedMessage.sender_name}</span>
                </div>
                <div className="flex items-center gap-2 text-text-main">
                  <Mail className="w-4 h-4 text-accent" />
                  <span>{selectedMessage.sender_email}</span>
                </div>
                <div className="flex items-center gap-2 text-text-main md:col-span-2">
                  <Phone className="w-4 h-4 text-accent" />
                  <span>{selectedMessage.sender_phone}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="text-sm text-text-main leading-relaxed bg-neutral/10 p-5 rounded-2xl border border-gray-50/50">
                {selectedMessage.content}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-2 font-bold text-xs text-text-main mb-1">
                  <Reply className="w-4 h-4 text-accent" />
                  <span>Répondre à cet utilisateur</span>
                </div>
                <textarea
                  placeholder="Écrivez votre message de réponse..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-accent min-h-[120px]"
                  required
                />
                <div className="flex justify-end">
                  <button 
                    type="submit"
                    disabled={sendingReply}
                    className="px-5 py-2.5 bg-accent hover:bg-accent/90 text-white font-bold text-xs rounded-xl shadow-md shadow-accent/20 flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    {sendingReply ? (
                      <>Réponse en cours...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Envoyer par email
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-12 text-center text-gray-400 flex flex-col items-center justify-center min-h-[360px]">
              <MessageCircle className="w-12 h-12 stroke-[1.5] text-gray-300 mb-2" />
              <p className="font-bold text-sm text-text-main">Aucun message sélectionné</p>
              <p className="text-xs text-text-muted mt-1">Sélectionnez un message dans la liste de gauche pour en lire le contenu.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
