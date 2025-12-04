import { Employee, AllConversations, ChatMessage, Conversation } from '../types';

const sampleMessages = [
  "Hola, ¿cómo estás?", "¡Todo bien! ¿Y tú?", "Necesito ayuda con el reporte trimestral. ¿Tienes un minuto?", "Claro, te llamo en 5.", "Perfecto, gracias.", "¿Revisaste el último correo sobre el proyecto K-7?", "Sí, lo vi. Tengo algunas dudas.", "Ok, hablemos de eso en la reunión de la tarde.", "¿Almorzamos juntos hoy?", "¡Me encantaría! ¿Nos vemos a la 1 pm en la cafetería?", "Hecho.", "Feliz cumpleaños, ¡que tengas un día genial!", "¡Muchas gracias! Te guardaré un trozo de pastel.",
];

export const generateChatData = (allEmployees: Employee[], currentUserId: number): AllConversations => {
  const conversations: AllConversations = {};
  const currentUser = allEmployees.find(e => e.id === currentUserId);
  if (!currentUser) return {};

  // Create Direct Messages
  allEmployees.forEach(employee => {
    if (employee.id === currentUserId) return;
    if (Math.random() > 0.5) { // Create DMs with 50% of users
      const conversationId = employee.id.toString();
      const messages: ChatMessage[] = [];
      const messageCount = Math.floor(Math.random() * 8) + 2;
      let lastTimestamp = Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 3);

      for (let i = 0; i < messageCount; i++) {
        const sender = Math.random() > 0.5 ? currentUser : employee;
        lastTimestamp += Math.floor(Math.random() * 1000 * 60 * 30) + 60000;
        messages.push({
          id: Date.now() + i + employee.id,
          senderId: sender.id,
          senderName: sender.name,
          text: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
          timestamp: lastTimestamp,
          read: sender.id === currentUserId || Math.random() > 0.3,
        });
      }

      conversations[conversationId] = {
        id: conversationId,
        type: 'dm',
        name: employee.name,
        avatar: employee.avatar,
        messages: messages.sort((a, b) => a.timestamp - b.timestamp),
        members: [currentUser, employee]
      };
    }
  });

  // Create Group Chats by Department
  const departments = [...new Set(allEmployees.map(e => e.departamento))];
  departments.forEach(dept => {
    const members = allEmployees.filter(e => e.departamento === dept);
    if (members.length < 2) return;

    const conversationId = `group_${dept.replace(/\s/g, '_')}`;
    const messages: ChatMessage[] = [];
    const messageCount = Math.floor(Math.random() * 10) + 5;
    let lastTimestamp = Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 2);

    for (let i = 0; i < messageCount; i++) {
        const sender = members[Math.floor(Math.random() * members.length)];
        lastTimestamp += Math.floor(Math.random() * 1000 * 60 * 45) + 60000;
        messages.push({
          id: Date.now() + i + members.length,
          senderId: sender.id,
          senderName: sender.name,
          text: `Mensaje de grupo: ${sampleMessages[Math.floor(Math.random() * sampleMessages.length)]}`,
          timestamp: lastTimestamp,
          read: true,
        });
    }

    conversations[conversationId] = {
        id: conversationId,
        type: 'group',
        name: dept,
        messages: messages.sort((a, b) => a.timestamp - b.timestamp),
        members: members
    };
  });


  return conversations;
};