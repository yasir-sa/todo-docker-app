# Node 22 Alpine பயன்படுத்துகிறோம்
FROM node:22-alpine

# வேலை செய்யும் இடம்
WORKDIR /app

# டிபென்டென்சிகளை காப்பி செய்து இன்ஸ்டால் செய்தல்
COPY package*.json ./
RUN npm install

# கோப்புகளை காப்பி செய்தல்
COPY . .

# Vite-ன் டிஃபால்ட் போர்ட்
EXPOSE 5173

# டெவலப்மென்ட் மோடில் ரன் செய்ய
CMD ["npm", "run", "dev", "--", "--host"]