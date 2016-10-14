/**
 * Created by Ashish Lamse on 7/10/16.
 */
var sinon = require('sinon');
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

var chaiHttp = require('chai-http');
var expect = chai.expect;
var should = chai.should();
var assert = chai.assert;

var server=require('../server');
var userModel = require("../model/userModel");
var userroutes = require("../routes/loginOperation");

chai.use(chaiHttp);

describe('Test case for test loginOperation  functionality',function(){
    var req,resp,spy,UserModelMock,spyjson,user,UserMock;

    beforeEach('globle beforeEach',function(){
        req = {}, resp={};
        spy = resp.send = sinon.spy();
        spyjson = resp.json = sinon.spy();

        UserModelMock=sinon.mock(userModel);
        UserMock=sinon.mock(user);

        user = {
            _id:'100',
            firstname:'Ashish',
            lastname:'Lamse',
            email:'ashish.lamse@gmail.com',
            password:'9893948172',
            role:'admin',
            passwordToken: '100'};

    });

    describe('Test checkAuthentication function functionality',function(){
        beforeEach('beforeEach',function(){
            req.body={email:user.email,password:user.password}
        });
        afterEach('afterEach',function(){
            userModel.find.restore();
        });
        it('should check for success else part',function(done){
            UserModelMock.expects('find')
                .withArgs({email:req.body.username,password:req.body.password})
                .yields(undefined,[{name:'Ashish',age:'24'},{name:'Salman',age:'54'}]);

            userroutes.checkAuthentication(req,resp);
            expect(spyjson.calledOnce).to.equal(true);
            done();
        });

        it('should check for success if part',function(done){
            UserModelMock.expects('find')
                .withArgs({email:req.body.username,password:req.body.password})
                .yields(undefined,{});

            userroutes.checkAuthentication(req,resp);
            expect(spyjson.calledOnce).to.equal(true);
            done();
        });

        it('should check for failure',function(done){
            UserModelMock.expects('find')
                .withArgs({email:req.body.username,password:req.body.password})
                .yields('some error',{});

            userroutes.checkAuthentication(req,resp);
            expect(spyjson.calledOnce).to.equal(false);
            done();
        });
    });

    describe('forgotPassword function functionality',function(){
       beforeEach('beforeEach',function(){
        req.body={email:user.email}
       });
        afterEach('afterEach',function(){
            userModel.find.restore();
        });
        it('should check for success',function(done){
            UserModelMock.expects('find')
                .withArgs({email:req.body.username})
                .yields(undefined,[{name:'Ashish',age:'24'},{name:'Salman',age:'54'}]);

            userroutes.forgotPassword(req,resp);
            expect(spyjson.calledOnce).to.equal(true);
            done();
        });

        it('should check for success if part',function(done){
            UserModelMock.expects('find')
                .withArgs({email:req.body.username})
                .yields(undefined,{});

            userroutes.forgotPassword(req,resp);
            expect(spyjson.calledOnce).to.equal(true);
            done();
        });

        it('should check for failure',function(done){
            UserModelMock.expects('find')
                .withArgs({email:req.body.username})
                .yields('some error',{});

            userroutes.forgotPassword(req,resp);
            expect(spyjson.calledOnce).to.equal(false);
            done();
        });

    });
describe('changePassword function functionality',function(){
       beforeEach('beforeEach',function(){
        req.body={email:user.email}
        req.body={password:user.email}
       });
        afterEach('afterEach',function(){
            userModel.update.restore();
        });
        it('should check for success',function(done){
            UserModelMock.expects('update')
                .withArgs({ email: req.body.username },
                    {password:req.body.password},
                    { upsert: true })
                .yields(undefined,user);

            userroutes.changePassword(req,resp);
            expect(spyjson.calledOnce).to.equal(true);
            done();
        });


        it('should check for failure',function(done){
            UserModelMock.expects('update')
                .withArgs({ email: req.body.username },
                    {password:req.body.password},
                    { upsert: true })
                .yields('some error',{});

            userroutes.changePassword(req,resp);
            expect(spyjson.calledOnce).to.equal(false);
            done();
        });

    });


});