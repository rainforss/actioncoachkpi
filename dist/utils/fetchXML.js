"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOfKpiForMlAndSubUser = exports.ListOfKpiForMlAndSubUserByTime = exports.KpiTotalForMlByTime = exports.GroupAllKpiEntriesBySubmitterParentUserAndFilterByTime = exports.GroupAllKpiEntriesBySubmitterParentUser = void 0;
exports.GroupAllKpiEntriesBySubmitterParentUser = "<fetch mapping='logical' aggregate='true'><entity name='ac_kpientry'><attribute name='ac_totalmarketinginvestment' alias='cashbanktotal' aggregate='sum'/><attribute name='ac_numberofleadtotal' alias='totallead' aggregate='sum'/><attribute name='ac_numberofondeckcalls' alias='totalondeckcalls' aggregate='sum'/><attribute name='ac_numberofdiagnostics' alias='totaldiagnostics' aggregate='sum'/><attribute name='ac_numberofnewclients' alias='totalnewclients' aggregate='sum'/><link-entity name='transactioncurrency' from='transactioncurrencyid' to='transactioncurrencyid'><attribute name='isocurrencycode' alias='isocurrency' groupby='true'/></link-entity><link-entity name='ac_actioncoachuser' from='ac_actioncoachuserid' to='ac_submitter'><link-entity name='ac_actioncoachuser' from='ac_actioncoachuserid' to='ac_parentactioncoachuser'><attribute name='ac_name' alias='parentName' groupby='true' /><attribute name='ac_actioncoachuserid' alias='parentId' groupby='true' /></link-entity></link-entity></entity></fetch>";
const GroupAllKpiEntriesBySubmitterParentUserAndFilterByTime = (beginMonth, beginYear, endMonth, endYear) => `<fetch mapping='logical' aggregate='true'><entity name='ac_kpientry'><attribute name='ac_totalmarketinginvestment' alias='cashbanktotal' aggregate='sum'/><attribute name='ac_numberofleadtotal' alias='totallead' aggregate='sum'/><attribute name='ac_numberofondeckcalls' alias='totalondeckcalls' aggregate='sum'/><attribute name='ac_numberofdiagnostics' alias='totaldiagnostics' aggregate='sum'/><attribute name='ac_numberofnewclients' alias='totalnewclients' aggregate='sum'/><filter type='and'><condition attribute='ac_year' operator='ge' value='${beginYear}'/><condition attribute='ac_year' operator='le' value='${endYear}'/><condition attribute='ac_month' operator='ge' value='${beginMonth}'/><condition attribute='ac_month' operator='le' value='${endMonth}'/></filter><link-entity name='transactioncurrency' from='transactioncurrencyid' to='transactioncurrencyid'><attribute name='isocurrencycode' alias='isocurrency' groupby='true'/></link-entity><link-entity name='ac_actioncoachuser' from='ac_actioncoachuserid' to='ac_submitter'><link-entity name='ac_actioncoachuser' from='ac_actioncoachuserid' to='ac_parentactioncoachuser'><attribute name='ac_name' alias='parentName' groupby='true' /><attribute name='ac_actioncoachuserid' alias='parentId' groupby='true' /></link-entity></link-entity></entity></fetch>`;
exports.GroupAllKpiEntriesBySubmitterParentUserAndFilterByTime = GroupAllKpiEntriesBySubmitterParentUserAndFilterByTime;
const KpiTotalForMlByTime = (acUserId, beginMonth, beginYear, endMonth, endYear) => `<fetch mapping='logical' aggregate='true'><entity name='ac_kpientry'><attribute name='ac_totalmarketinginvestment' alias='cashbanktotal' aggregate='sum'/><attribute name='ac_numberofleadtotal' alias='totallead' aggregate='sum'/><attribute name='ac_numberofondeckcalls' alias='totalondeckcalls' aggregate='sum'/><attribute name='ac_numberofdiagnostics' alias='totaldiagnostics' aggregate='sum'/><attribute name='ac_numberofnewclients' alias='totalnewclients' aggregate='sum'/><filter type='and'><condition attribute='ac_year' operator='ge' value='${beginYear}'/><condition attribute='ac_year' operator='le' value='${endYear}'/><condition attribute='ac_month' operator='ge' value='${beginMonth}'/><condition attribute='ac_month' operator='le' value='${endMonth}'/></filter><link-entity name='transactioncurrency' from='transactioncurrencyid' to='transactioncurrencyid'><attribute name='isocurrencycode' alias='isocurrency' groupby='true'/></link-entity><link-entity name='ac_actioncoachuser' from='ac_actioncoachuserid' to='ac_submitter'><attribute name='ac_name' alias='parentName' groupby='true' /><attribute name='ac_actioncoachuserid' alias='parentId' groupby='true' /><filter type='and'><condition attribute='ac_parentactioncoachuser' operator='eq' value='${acUserId}' /></filter></link-entity></entity></fetch>`;
exports.KpiTotalForMlByTime = KpiTotalForMlByTime;
const ListOfKpiForMlAndSubUserByTime = (acUserId, beginMonth, beginYear, endMonth, endYear) => `<fetch mapping='logical'>
	<entity name='ac_kpientry'>
		<attribute name='ac_totalmarketinginvestment' alias='cashbanktotal'/>
		<attribute name='ac_numberofleadtotal' alias='totallead'/>
		<attribute name='ac_numberofondeckcalls' alias='totalondeckcalls'/>
		<attribute name='ac_numberofdiagnostics' alias='totaldiagnostics'/>
		<attribute name='ac_numberofnewclients' alias='totalnewclients'/>
		<filter type='and'>
			<condition attribute='ac_year' operator='ge' value='${beginYear}'/>
			<condition attribute='ac_year' operator='le' value='${endYear}'/>
			<condition attribute='ac_month' operator='ge' value='${beginMonth}'/>
			<condition attribute='ac_month' operator='le' value='${endMonth}'/>
		</filter>
		<link-entity name='transactioncurrency' from='transactioncurrencyid' to='transactioncurrencyid'>
			<attribute name='isocurrencycode' alias='isocurrency'/>
		</link-entity>
		<link-entity name='ac_actioncoachuser' from='ac_actioncoachuserid' to='ac_submitter'>
			<attribute name='ac_name' alias='parentName'/>
			<attribute name='ac_actioncoachuserid' alias='parentId'/>
			<filter type='or'>
				<condition attribute='ac_parentactioncoachuser' operator='eq' value='${acUserId}' />
				<condition attribute='ac_actioncoachuserid' operator='eq' value='${acUserId}' />
			</filter>
		</link-entity>
	</entity>
</fetch>`;
exports.ListOfKpiForMlAndSubUserByTime = ListOfKpiForMlAndSubUserByTime;
const ListOfKpiForMlAndSubUser = (acUserId) => `<fetch mapping='logical'>
	<entity name='ac_kpientry'>
		<attribute name='ac_totalmarketinginvestment' alias='cashbanktotal'/>
		<attribute name='ac_numberofleadtotal' alias='totallead'/>
		<attribute name='ac_numberofondeckcalls' alias='totalondeckcalls'/>
		<attribute name='ac_numberofdiagnostics' alias='totaldiagnostics'/>
		<attribute name='ac_numberofnewclients' alias='totalnewclients'/>
		<link-entity name='transactioncurrency' from='transactioncurrencyid' to='transactioncurrencyid'>
			<attribute name='isocurrencycode' alias='isocurrency'/>
		</link-entity>
		<link-entity name='ac_actioncoachuser' from='ac_actioncoachuserid' to='ac_submitter'>
			<attribute name='ac_name' alias='parentName'/>
			<attribute name='ac_actioncoachuserid' alias='parentId'/>
			<filter type='or'>
				<condition attribute='ac_parentactioncoachuser' operator='eq' value='${acUserId}' />
				<condition attribute='ac_actioncoachuserid' operator='eq' value='${acUserId}' />
			</filter>
		</link-entity>
	</entity>
</fetch>`;
exports.ListOfKpiForMlAndSubUser = ListOfKpiForMlAndSubUser;
//# sourceMappingURL=fetchXML.js.map