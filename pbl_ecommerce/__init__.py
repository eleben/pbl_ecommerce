
__version__ = '0.0.1'
import frappe,json, datetime
from frappe.website.doctype.website_settings.website_settings import get_website_settings
@frappe.whitelist(allow_guest=True)
def make_quote(quote_args=None):
	try:
		if isinstance(quote_args,str):
			quote_args = json.loads(quote_args)
		user,items = quote_args.get("user"),quote_args.get("cart_items")
		def _get_linked_customer(user_id):
			contact = frappe.get_value("Contact",dict(user=user_id),"name")
			customer = frappe.get_value("Dynamic Link",dict(parent=contact, link_doctype="Customer"),"link_name")
			return customer
		customer_doc =  _get_linked_customer(user)
		if not customer_doc:
			error_message = dict(exception="Data Error: No customer linked to your account {}".format(user) ,exc_type="Unauthorized", exc="Data Error: No customer linked to your account {}".format(user))
			return error_message
		args = dict(
			doctype="Quotation",
			series ="SAL-QTN-.YYYY.-",
			quotation_to= "Customer",
			party_name= customer_doc,
			transaction_date = datetime.date.today(),
			order_type = "Shopping Cart"
		)
		doc = frappe.get_doc(args)
		for item in items:
			item_dict = frappe.get_value("Item",item.get("item_code"),["item_group","stock_uom"], as_dict=True)
			row = doc.append("items",{})
			row.item_code = item.get("item_code")
			row.item_name = item.get("item_name")
			row.description = item.get("web_long_description") or item.get("web_item_name") or item.get("item_code")
			row.qty = item.get("quantity_ordered")
			row.uom = item_dict.get("stock_uom")
			row.stock_uom = item_dict.get("stock_uom")
			row.item_group = item_dict.get("item_group")
			row.conversion_factor = 1
		doc.save(ignore_permissions=True)
		frappe.db.commit()
		return doc.name
	except Exception as e:
		error_message = dict(exception="Data Error: {}".format(e) ,exc_type="Data Error", exc=f"{e}")
		# frappe.response(error_message)
		return error_message
@frappe.whitelist(allow_guest=True)
def shopping_cart_offers():
    date_today = datetime.date.today()
    return frappe.get_all("Shopping Cart Offer", fields =["*"], filters=dict(offer_expiry=[">=", date_today]))
@frappe.whitelist(allow_guest=True)
def get_guest_access_keys():
    return frappe.get_single("Credentials")
@frappe.whitelist(allow_guest=True)
def get_default_pbl_404():
    return frappe.get_value("Web Page","pbl-404","main_section_html")
@frappe.whitelist(allow_guest=True)
def footer_info():
    return get_website_settings()
