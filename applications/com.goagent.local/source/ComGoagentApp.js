enyo.kind
(
    {
    	name: "ComGoagentApp",kind: enyo.VFlexBox,components: [

		    {kind: "PageHeader", components: [
					{kind:"Image", src:"settings32.png"},        			
        			{content: "Settings"}
			 ]},
			 
		    {flex:1, kind: "Pane",components: [   
				     {kind: "InputBox",components:[
				     		{kind: "LabeledContainer", label:"Enable", style:"position:absolute;left:0px;"},
							{name:"toggle_button",kind: "ToggleButton",onLabel:"On",offLabel:"Off",onChange:"buttonToggle",style:"position:absolute;right:0px;"}
				    ]}
		        ]},
            {flex:2, kind: "LabeledContainer", label:"Developed by @hewigovens",style:"width:100%;text-align:center;"},
            {kind: "Toolbar", components: []},
            {name: "startGoAgent", kind: "PalmService", service: "palm://com.goagent.local.service", method: "start"},
            {name: "stopGoAgent", kind: "PalmService", service: "palm://com.goagent.local.service", method: "stop"},
            {name: "statusGoAgent", kind: "PalmService", service: "palm://com.goagent.local.service", method: "status",onSuccess:"handleSuccess",onFailure:"handleFailure"},
            {name: "versionGoAgent", kind: "PalmService", service: "palm://com.goagent.local.service", method: "version"}
	    ],
	    
        buttonToggle:function(inSender,inState)
        {
            this.log("current state is "+inState);
            if (inState){
                this.$.startGoAgent.call("{}");
            }
            else{
                this.$.stopGoAgent.call("{}");
            }
        },
        ready:function(){
            this.log("query goagent status");
            this.$.statusGoAgent.call("{}");
        },
        handleSuccess:function(inSender,inResponse){
            enyo.log(enyo.json.stringify(inResponse));
            this.$.toggle_button.setState(inResponse.running);
        },
        handleFailure:function(inSender,inResponse){
            enyo.log(en.json.stringify(inResponse));
        }
    }
);
