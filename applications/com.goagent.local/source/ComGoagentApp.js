enyo.kind(
{
	name: "ComGoagentApp",
	kind: enyo.VFlexBox,
	components:
	[
		{
			kind: "ToggleButton",
			onLabel:"On",
			offLabel:"Off",
			onChange:"buttonToggle",
		
			buttonToggle : function(inSender,inState){
				this.log("Toggled to state" + inState);
			}
		}
	]
});
