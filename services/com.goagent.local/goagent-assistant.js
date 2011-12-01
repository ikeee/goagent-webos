function StatusAssistant() {};
StatusAssistant.prototype.run = function(future){
    this.file = "/media/cryptofs/apps/usr/palm/services/com.goagent.local.service/"
            + "running.status";
    this.pathLib = require("path");
    if(this.pathLib.existsSync(this.file)) {
        future.result={running:true};
    }
    else future.result={running:false};
};

function VersionAssistant() {};
VersionAssistant.prototype.run = function(future){
	future.result = {version:"1.0.0"};
};

function StartAssistant() {};
StartAssistant.prototype.run = function(future){
    this.controller.args.state = "on";
    handleGoagent(future,this.controller.args);
};

function StopAssistant() {};
StopAssistant.prototype.run = function(future){
	this.controller.args.state = "off";
	handleGoagent(future,this.controller.args);
};

function handleGoagent(future,args){
    this.future = future;
	this.file = "/media/cryptofs/apps/usr/palm/services/com.goagent.local.service/"
			+ "running.status";
	this.startScript = "/media/cryptofs/apps/usr/palm/services/com.goagent.local.service/scripts/start.sh";
	this.stopScript = "/media/cryptofs/apps/usr/palm/services/com.goagent.local.service/scripts/stop.sh";
	this.pathLib = require("path");
	if(args.state) {
		this.state = args.state.toLowerCase();
		this.fs = require("fs");
		if(this.state=="on") {
			this.fs.writeFile(this.file, JSON.stringify({state:"on"}),
					"utf8");
			this.cmd = new CommandLine("/bin/sh " + this.startScript,this.future);
			this.cmd.run();
            //var spawn = require("child_process").spawn;
            //var goagent = spawn("/media/internal/goagent/usr/bin/python",["/media/internal/goagent/local/proxy.py"],{setsid:true});
            return;
		} else if(this.state=="off") {
			if(this.pathLib.existsSync(this.file)) {
				this.fs.unlink(this.file);
			}
			//this.cmd = new CommandLine("/bin/sh " + this.stopScript, this.future);
			this.cmd = new CommandLine("killall python",this.future);
			this.cmd.run();
		} else if(this.state=="strobe") {
			this.future.result = {errorCode:"ERROR", errorText:"Strobe feature not "
					+ "available for webOS 2.0."};
		} else {
			this.future.result = {errorCode:"ERROR", errorText:"Invalid state"};
		}
	} else {
		this.future.result = {errorCode:"ERROR", errorText:"Improperly formatted request."};
	}
};
