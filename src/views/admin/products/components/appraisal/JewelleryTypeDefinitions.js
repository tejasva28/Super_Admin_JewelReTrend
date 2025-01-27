// File: src/views/admin/products/components/appraisal/JewelleryTypeDefinitions.js

export const LOCAL_DEFINITIONS = {
  RING: {
    fields: [
      { name: "ringSize", type: "NUMBER", required: true },
      { name: "metalPurity", type: "STRING", required: true },
      { 
        name: "ringStyle", 
        type: "STRING", 
        required: true,
        options: ["Solitaire", "Halo", "Three-Stone", "Vintage", "Modern"] 
      },
      { name: "engraving", type: "STRING", required: true },
    ],
  },
  NECKLACE: {
    fields: [
      { name: "chainLength", type: "STRING", required: true },
      { 
        name: "claspType", 
        type: "STRING", 
        required: true,
        options: ["Lobster Claw", "Spring Ring", "Toggle", "Box Clasp", "Magnetic"] 
      },
      { name: "pendantShape", type: "STRING", required: true, options: ["Round", "Oval", "Heart", "Teardrop", "Square"] },
    ],
  },
  EARRINGS: {
    fields: [
      { 
        name: "earringStyle", 
        type: "STRING", 
        required: true,
        options: ["Stud", "Hoop", "Drop", "Chandelier", "Huggie"] 
      },
      { name: "earringSize", type: "STRING", required: true },
    ],
  },
  BRACELETS: {
    fields: [
      { 
        name: "braceletType", 
        type: "STRING", 
        required: true,
        options: ["Cuff", "Chain", "Bangle", "Charm", "Link"] 
      },
      { name: "braceletSize", type: "STRING", required: true },
      { name: "braceletPattern", type: "STRING", required: true },
    ],
  },
  BANGLES: {
    fields: [
      { name: "numberOfBangles", type: "NUMBER", required: true },
      { 
        name: "bangleDesign", 
        type: "STRING", 
        required: true,
        options: ["Plain", "Embellished", "Engraved", "Etched", "Gemstone-Inlaid"] 
      },
      { name: "bangleAdjustable", type: "BOOLEAN", required: true },
    ],
  },
  CHAIN: {
    fields: [
      { name: "chainLength", type: "STRING", required: true },
      { 
        name: "chainStyle", 
        type: "STRING", 
        required: true,
        options: ["Cable", "Box", "Figaro", "Curb", "Singapore"] 
      },
    ],
  },
  MANGALSUTRA: {
    fields: [
      { name: "mangalsutraChainLength", type: "STRING", required: true },
      { 
        name: "mangalsutraPendantStyle", 
        type: "STRING", 
        required: true,
        options: ["Traditional", "Modern", "Gemstone", "Diamond", "Pearl"] 
      },
      { name: "mangalsutraSubStyle", type: "STRING", required: true },
      { name: "mangalsutraCordLength", type: "STRING", required: true },
      { name: "mangalsutraCordStyle", type: "STRING", required: true },
    ],
  },
};

export function mergeDefinitions(localDefs, backendDefs) {
  const finalMap = { ...localDefs };
  backendDefs.forEach((def) => {
    try {
      const parsed = JSON.parse(def.fieldDefinitions);
      if (parsed.fields && Array.isArray(parsed.fields)) {
        finalMap[def.typeName] = { fields: parsed.fields };
      }
    } catch (err) {
      console.error(`Error parsing fieldDefinitions for ${def.typeName}`, err);
    }
  });
  return finalMap;
}
