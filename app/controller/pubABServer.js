'use strict';
/*eslint-disable*/
const SrvABS     = require('../service/ABServer').default;
const Controller = require('egg').Controller;

class PubABServerController extends Controller {
  async analysis () {
    const { ctx }     = this,
          { service } = ctx;
    
    ctx.body = await SrvABS.analysis();
  }
}

module.exports = PubABServerController;
