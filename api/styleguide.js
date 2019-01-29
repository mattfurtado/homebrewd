const express = require('express');
const fs = require('fs');
const xmlParser = require('xml2json');

const router = express.Router();

router.get('/:classType?/:categoryId?', (req, res) => {
  fs.readFile('./static/bjcp-styleguide.xml', (error, data) => {
    if (error) throw error;
    const { classType, categoryId } = req.params;
    const { styleguide } = xmlParser.toJson(data, { object: true });
    if (classType) {
      const styleClass = styleguide.class.find(cls => cls.type === classType);
      if (!styleClass) {
        throw new Error(`No class type found for '${classType}'`);
      }
      if (categoryId) {
        const styleCategory = styleClass.category.find(
          cat => cat.id === categoryId
        );
        if (!styleCategory) {
          throw new Error(
            `No ${classType} found with category ID ${categoryId}`
          );
        }
        return res.send(JSON.stringify(styleCategory));
      } else {
        return res.send(JSON.stringify(styleClass));
      }
    }
    return res.send(JSON.stringify(styleguide));
  });
});

module.exports = router;
