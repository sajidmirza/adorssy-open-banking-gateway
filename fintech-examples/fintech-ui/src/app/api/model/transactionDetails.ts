/**
 * Open Banking Gateway FinTech Example API
 * This is a sample API that shows how to develop FinTech use cases that invoke banking APIs.  #### User Agent and Cookies This Api assumes * that the PsuUserAgent (hosting the FinTechUI) is a modern web browser that stores httpOnly cookies sent with the redirect under the given domain and path as defined by [RFC 6265](https://tools.ietf.org/html/rfc6265). * that any other PsuUserAgent like a native mobile or a desktop application can simulate this same behavior of a modern browser with respect to Cookies.  #### SessionCookies and XSRF After a PSU is authenticated with the FinTech environment (either through the simple login interface defined here, or through an identity provider), the FinTechApi will establish a session with the FinTechUI. This is done by the mean of using a cookie called SessionCookie. This SessionCookie is protected by a corresponding xsrfToken. The response that sets a SessionCookie also carries a corresponding xsrfToken in the response header named \"X-XSRF-TOKEN\".  It is the responsibility of the FinTechUI to : * parse and store this xsrfToken so that a refresh of a browser window can work. This shall be done using user agent capabilities. A web browser application might decide to store the xsrfToken in the browser localStorage, as the cookie we set are all considered persistent. * make sure that each subsequent request that is carrying the SessionCookie also carries the corresponding xsrfToken as header field (see the request path). * remove this xsrfToken from the localStorage when the corresponding SessionCookie is deleted by a server response (setting cookie value to null).  The main difference between an xsrfToken and a SessionCookie is that the sessionCookie is automatically sent with each matching request. The xsrfToken must be explicitely read and sent by application.  #### API- vs. UI-Redirection For simplicity, this Framework is designed to redirect to FinTechUI not to FinTechApi.  #### Explicite vs. Implicite Redirection We define an \"Implicite redirection\" a case where a web browser react to 30X reponse and automatically redirects to the attached endpoint. We define an \"Explicite Redirection\" as a case where the UI-Application reacts to a 20X response, explicitely parses the attached __Location__ header an uses it to reload the new page in the browser window (or start the new UI-Application in case of native apps).  This framework advocates for explicite redirection passing a __20X__ response to the FinTechUI toghether with the __Location__ parameter.  Processing a response that initiates a redirect, the FinTechUI makes sure following happens, * that the exisitng __SessionCookie__ is deleted, as the user will not have a chance for an explicite logout, * that the corresponding xsrfToken is deleted from the local storage, * that a RedirectCookie set is stored (in case UI is not a web browser), so the user can be authenticated against it when sent back to the FinTechUI. The expiration of the RedirectCookie shall be set to the expected duration of the redirect, * that the corresponding xsrfToken is stored in the local storage (under the same cookie path as the RedirectCookie)  #### Redirecting to the ConsentAuthorisationApi For a redirection to the ConsentAuthorisationApi, a generated AUTH-ID is added to the cookie path and used to distinguish authorization processes from each order. This information (AUTH-ID) must be contained in the back redirect url sent to the ConsentAuthorisationApi in the back channel, so that the FinTechUI can invoke the correct code2Token endpoint when activated. 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ReportExchangeRate } from './reportExchangeRate';
import { Amount } from './amount';
import { AccountReference } from './accountReference';
import { PurposeCode } from './purposeCode';


/**
 * Transaction details.
 */
export interface TransactionDetails { 
    /**
     * the Transaction Id can be used as access-ID in the API, where more details on an transaction is offered. If this data attribute is provided this shows that the AIS can get access on more details about this transaction using the Get transaction details request. 
     */
    transactionId?: string;
    /**
     * Is the identification of the transaction as used e.g. for reference for deltafunction on application level. The same identification as for example used within camt.05x messages. 
     */
    entryReference?: string;
    /**
     * Unique end to end identity.
     */
    endToEndId?: string;
    /**
     * Identification of Mandates, e.g. a SEPA Mandate ID.
     */
    mandateId?: string;
    /**
     * Identification of a Cheque.
     */
    checkId?: string;
    /**
     * Identification of Creditors, e.g. a SEPA Creditor ID.
     */
    creditorId?: string;
    /**
     * The date when an entry is posted to an account on the ASPSPs books. 
     */
    bookingDate?: string;
    /**
     * The Date at which assets become available to the account owner in case of a credit.
     */
    valueDate?: string;
    transactionAmount: Amount;
    /**
     * Array of exchange rates.
     */
    currencyExchange?: Array<ReportExchangeRate>;
    /**
     * Creditor Name.
     */
    creditorName?: string;
    creditorAccount?: AccountReference;
    /**
     * Ultimate Creditor.
     */
    ultimateCreditor?: string;
    /**
     * Debtor Name.
     */
    debtorName?: string;
    debtorAccount?: AccountReference;
    /**
     * Ultimate Debtor.
     */
    ultimateDebtor?: string;
    /**
     * Unstructured remittance information. 
     */
    remittanceInformationUnstructured?: string;
    /**
     * Reference as contained in the structured remittance reference structure (without the surrounding XML structure).  Different from other places the content is containt in plain form not in form of a structered field. 
     */
    remittanceInformationStructured?: string;
    /**
     * Might be used by the ASPSP to transport additional transaction related information to the PSU. 
     */
    additionalInformation?: string;
    purposeCode?: PurposeCode;
    /**
     * Bank transaction code as used by the ASPSP and using the sub elements of this structured code defined by ISO 20022.  This code type is concatenating the three ISO20022 Codes   * Domain Code,   * Family Code, and   * SubFamiliy Code by hyphens, resulting in �DomainCode�-�FamilyCode�-�SubFamilyCode�. 
     */
    bankTransactionCode?: string;
    /**
     * Proprietary bank transaction code as used within a community or within an ASPSP e.g. for MT94x based transaction reports. 
     */
    proprietaryBankTransactionCode?: string;
}
