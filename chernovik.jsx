const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
//////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 2 способа сюроса фильтрации, сброса пагинации
  /*
  1)(но в случаях с массивами это не сработает)
    useEffect(() => {
    api.professions
      .fetchAll()
      .then((data) =>
        setProfessions(
          Object.assign(data, { allProfession: { name: "Все професии" } })
        )
      );
  }, []);

   const filteredUsers =
    selectedProf && selectedProf._id
      ? allUsers.filter((user) => user.profession === selectedProf)
      : allUsers;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  2) второй способ создать кнопку 

   useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  сonst filteredUsers = selectedProf
    ? allUsers.filter((user) => user.profession === selectedProf)
    : allUsers;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };

       <>
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </>
      )}

  Чем этот метод лучше, так это потоиу что в данную функцию, мы можем добавить не только отчистку, но и сюда же добавить сброс страницы,
без лишних use-эффектов. И реакт это будет оптимизировать не как несколько последовательных действий, а как одно полное действие, которое
изменяет состояние всего нашего компонента 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  */


  //import { paginate } from "..utils/paginate";

  
  // const changeTitleClasses = () => {
  //     let classes = users.length
  //     if (classes === 0) {
  //         classes = 'Никто с тобой не тусанёт'
  //     } else if (classes === 2 || classes === 3 || classes === 4) {
  //         classes  +=  '  человека тусанут с тобой сегодня'
  //     }else if (classes === 1) {
  //         classes  +=  '  человек тусанёт с тобой сегодня'
  //     }else {
  //         classes  += '  человек тусанут с тобой сегодня'
  //     }
  //     return classes
  // }

  // const handleDelete = (userId) => {
  //     setUsers(users.filter((user) => user._id !== userId))
  // }

  // return (
  //     users.length !== 0 &&
  //     users.map((user) => (
  //     <tr
  //         key={user._id}
  //     >
  //         <td>{user.name}</td>
  //         <td>
  //             {
  //             user.qualities.map((quality) => (
  //                 <span key ={quality._id}
  //                 className = {"badge m-2 bg-"+ quality.color}
  //                 >
  //                     {quality.name}</span>
  //             ))
  //             }
  //         </td>
  //         <td>{user.profession.name}</td>
  //         <td>{user.completedMeetings}</td>
  //         <td>{user.rate}</td>
  //         <button
  //             type = 'button'
  //             className = 'btn btn-danger btn-sm m-2 btn-outline-danger'
  //             onClick = {() => users.OnDelete(user._id)}
  //             >
  //                 delete
  //          </button>
  //          <i className='bi bi-bookmark'
  //             onClick={() => users.OnBookMark()}></i>

  //     </tr>
  //     ))
  //     )
};

// if(users.length == 0) {
//     return <h1>{changeTitleClasses()}</h1>
// }
return (
  <>
    {users.length > 0 && (
      <table className="table table-striped align-right">
        <thead>
          <tr>
            <td>Имя</td>
            <td>Качества</td>
            <td>Профессия</td>
            <td>Количество встреч</td>
            <td>Оценка</td>
            <td>Избранное</td>
          </tr>
        </thead>
        <tbody>{renderPhrase()}</tbody>
      </table>
    )}
  </>
);

const User = ({ user, onDelete, onBookMark }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((quality) => (
          <Qualitie {...quality} key={quality._id} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>
        {
          <BookMark
            onBookMark={onBookMark}
            status={user.isBookmarked}
            userId={user._id}
          />
        }
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger btn-sm m-2"
          onClick={() => onDelete(user._id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookMark: PropTypes.func.isRequired,
};

export default User;


const handleToggleBookMark = (userId) => {
  setUsers(
    users.map((user) =>
      user._id === userId
        ? { ...user, isBookmarked: !user.isBookmarked }
        : user
    )
  );
};

console.log(Object.keys(items));
return (
  <ul className="list-group">
    {Object.keys(items).map((item) => (
      <li
        key={items[item][valueProperty]}
        className={
          "list-group-item" + (items[item] === selectedItem ? " active" : "")
        }
        onClick={() => onItemSelect(items[item])}
        role="button"
      >