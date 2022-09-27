const router = require('express').Router();
const { getAllActifity, getOneActifity, postActifity, updateActifity, deleteActifity } = require('../controller/actifityGroupsController');


router.get('/', getAllActifity);

router.get('/:id', getOneActifity);

router.post('/', postActifity);

router.patch('/:id', updateActifity);

router.delete('/:id', deleteActifity);

module.exports = router;