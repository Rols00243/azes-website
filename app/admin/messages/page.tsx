import { requireAuth } from '@/lib/admin-auth'
import { getMessages } from '@/lib/server-data'
import MessagesInbox from './MessagesInbox'

export default async function MessagesPage() {
  await requireAuth()
  const messages = await getMessages()
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Messages reçus</h1>
      <p className="text-gray-400 text-sm mb-8">
        Messages et sollicitations envoyés depuis le formulaire de contact du site.
      </p>
      <MessagesInbox initialMessages={messages} />
    </div>
  )
}
