import React from 'react';
import './listadmin.css';
import HeaderAdmin from '../../component/header-admin/header-admin';
import Footer from '../../component/footer/footer';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import CardGroup from '../../component/card-group/card-group';
import CardUser from '../../component/card-user/card-user';
import FullscreenOverlay from '../../component/fullscreen-overlay/fullscreen-overlay';
import SideOverlayText from '../../component/side-overlay-text/side-overlay-text';
import SideOverlayBlank from '../../component/side-overlay-blank/side-overlay-blank';
import SideOverlayHeader from '../../component/side-overlay-header/side-overlay-header';
import RegisterFormCard from '../../component/register-form-card/register-form-card';

// other Library
import { firestore } from '../../firebase/firebase';
import { connect } from 'react-redux';
import { addAdmin } from '../../redux/user/user.action';
import { toggleOverlay, toggleRightDetail } from '../../redux/toggle/toggle.action';
import { addSelectedUser } from '../../redux/user/user.action';
import RightDetail from '../../component/right-detail/right-detail';

const ListAdmin = ({ admin, addAdmin, toggleOverlay, stateOverlay, toggleRightDetail, stateRightDetail, addSelectedUser, selectedUser }) => {

    React.useEffect(() => {
        async function getData() {
            const userRef = firestore.collection('users').where('isAdmin', '==', true);

            userRef.onSnapshot(async snap => {
                const changes = snap.docChanges();

                changes.forEach(change => {
                    if (change.type === 'added') {
                        addAdmin({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'modified') {
                        addAdmin({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'removed') {
                        // removeMedicine({ id: change.doc.id, ...change.doc.data() });

                    }
                })
            })
        }

        getData();
    }, [addAdmin])

    const [search, setSearch] = React.useState('');

    const handleSearch = (event) => {
        event.preventDefault();

        setSearch(event.target.value.toLowerCase());
    }

    const handleClick = (data) => {
        addSelectedUser(data)
    }

    return (
        <div>
            <HeaderAdmin />
            <div className='right-left-container'>
                <div className={`list-admin ${stateRightDetail && 'minified'}`}>
                    <PageHeader title='Admin' colorSchema='#2ecc71' buttonColor='outline-success' onChange={handleSearch} onClick={() => toggleOverlay()} />
                    <SectionSeparator />
                    <CardGroup>
                        {admin.filter(data => data.displayName.toLowerCase().includes(search)).map((data, index) => <CardUser key={index} data={data} buttonColor='outline-success' onClick={() => handleClick(data)} userData={selectedUser} />)}
                    </CardGroup>
                </div>
                <RightDetail active>
                    <SideOverlayHeader />
                </RightDetail>
            </div>
            <Footer />

            <FullscreenOverlay active={stateOverlay}>
                <SideOverlayText
                    header='Form Tambah Admin'
                    text='Silahkan isi form di samping ini, untuk menambah admin'
                    footer='Pastikan isi form berikut dengan benar, agar tidak terjadi kesalah pahaman'
                    bgcolor='31CC70'
                    color='fff'
                />
                <SideOverlayBlank>
                    <SideOverlayHeader />
                    <RegisterFormCard isAdmin />
                </SideOverlayBlank>
            </FullscreenOverlay>
        </div>
    )
}

const mapStateToProps = state => ({
    admin: state.user.admin,
    stateOverlay: state.toggle.toggleOverlay,
    stateRightDetail: state.toggle.toggleRightDetail,
    selectedUser: state.user.selectedUser
})

const mapDispatchToProps = dispatch => ({
    addAdmin: admin => dispatch(addAdmin(admin)),
    toggleOverlay: () => dispatch(toggleOverlay()),
    addSelectedUser: (user) => dispatch(addSelectedUser(user)),
    toggleRightDetail: () => dispatch(toggleRightDetail())
})

export default connect(mapStateToProps, mapDispatchToProps)(ListAdmin);