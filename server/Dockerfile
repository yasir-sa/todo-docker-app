# Node 22 Alpine பயன்படுத்துகிறோம்
FROM node:22-alpine

# வேலை செய்யும் இடம்
WORKDIR /app

# டிபென்டென்சிகளை காப்பி செய்து இன்ஸ்டால் செய்தல்
COPY package*.json ./
RUN npm install

# கோப்புகளை காப்பி செய்தல்
COPY . .

# சர்வர் போர்ட்
EXPOSE 5000

# சர்வரை ரன் செய்ய
CMD ["node", "server.js"]