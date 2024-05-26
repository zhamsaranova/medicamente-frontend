import Breadcrumbs from "../components/blocks/Breadcrumbs";
import Contacts from "../components/blocks/Contacts";

function ContactsPage() {
  return (
    <>
      <Breadcrumbs
        path={[
          { text: "Главная", href: "/" },
          { text: "Контакты", href: "contacts" },
        ]}
      />
      <Contacts />
    </>
  );
}

export default ContactsPage;
