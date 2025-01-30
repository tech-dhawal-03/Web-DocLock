import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  Add,
  Search,
  RemoveRedEye,
  MoreVert,
  FilterList,
  Sort,
  Article,
  Delete,
  GetApp,
} from "@mui/icons-material";
import logo from "../assets/logo1.png";
import document from "../assets/document.png";
import "../all_css/carddocument.css";
import { CiLogout } from "react-icons/ci";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { IoDocumentSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import axios from "../controllers/axios";

function CardDocument() {
  const pass = useContext(Context);
  const user_personal = pass.user_id;

  let fetchCategories;

  //document requisite
  const [categories, setCategories] = useState([
    { name: "Others", color: getRandomColor() },
  ]);


  //get category from backend

  useEffect(()=>{
    fetchCategories = async()=>{
    try{
      const response = await axios.get(`/card-add-document/${user_personal}`)
      const categoriesArray = response.data;
      console.log(categoriesArray);

      
      //creating new array of newly added categories
      const newCategories = categoriesArray.map((cat)=>
      (
         
        {name : cat, color : getRandomColor()}
        
        
      ))


      //now setting previous and newly added categories to a single array
      setCategories([
        ...categories,...newCategories
      ])

      

      

  }


      

    
    catch(err)
    {
      console.log(`Unable to get category : ${err.message}`);
    }

  }

  fetchCategories();

  },[])


  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);



  const handleOpenFileDialog = (category) => {
    setSelectedCategory(category);
    setOpenFileDialog(true);
  };

  const handleCloseFileDialog = () => {
    setOpenFileDialog(false);
  };

  const fetchFile = async() =>
  // we will fetch all the files, and will display on UI based on what user chooses
  {
    
    try{
      let response = await axios.get(`/card-add-document/${user_personal}/get-all-files`)
      response = response.data
      console.log(response)

      const filesObtained = response.map((item,index)=>(
        
          {
            category : item.category,
            name : item.fileName,
            date : new Date(item.dateUploaded).toLocaleString(),
            url : item.url ,

          }
        
        )

      )

      setFiles([...files,...filesObtained])
      
    }

    catch(err)
    {
      console.log(`Unable to connect with backend api : ${err.message}`);
    }
  }

  useEffect(()=>{
    fetchFile();

  },[])

  const handleAddFile = async(e) => {
    const file = e.target.files[0];
    console.log(selectedCategory);

    if (file) {
      setFiles([
        ...files,
        {
          category: selectedCategory,
          name: file.name,
          date: new Date().toLocaleString(),
          url: URL.createObjectURL(file),
        },
      ]);


      //this file data is not easily accessible at the backend, so making it as a part of multipart/form-data

      const fileData = new FormData();
      fileData.append('file',file)
      fileData.append('category',selectedCategory)

      console.log(fileData);


      

      //posting file to backend - api handling

      try{
        const postFile = await axios.post(`/card-add-document/${user_personal}/upload-document`,
          fileData
        )
        handleCloseFileDialog();
        if(postFile) toast.success("File Uploaded Successfully !")
          
     

      }
       catch(err)
       {
        console.log(`Unable to establish connection with the backend...:${err.message}`);
        

       }


  
      handleCloseFileDialog();
    }
  };

  const handleOpenCategoryDialog = () => {
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
    setNewCategoryName("");
  };

  const handleAddCategory = async() => {

    if (newCategoryName) {
      setCategories([
        ...categories,
        { name: newCategoryName, color: getRandomColor() },
      ]);



      //TO-DO : 1 To add this category to user database  
      //Handling POST HTTPS request
      //Mongoose User Model will be used...


      try{
        console.log(user_personal);
        const response = await axios.post(`/card-add-document/${user_personal}`,{newCategoryName})
        console.log(response.status);
       


        if(response.status == 200) 
          {
            handleCloseCategoryDialog();
          }

      }

      catch(err)
      {
        console.log(`Unable to add category : ${err.message}`);
      }


      // try{
      //   await axios.get("/carddocument").then(function(docs,err){
      //     if(err) throw err;
      //     else{
      //       console.log(docs.data);
      //     }
      //   })


      // }
      // catch(error)
      // {
      //   console.log(`Unable to add category to database : ${error.message} `);
      // }


      
      
      handleCloseCategoryDialog();
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFiles = files.filter(
    
    
    (file) =>

      file.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? file.category === selectedCategory : true)
    
  );

  const handleCategoryMenuClick = (event, category) => {
    setAnchorEl(event.currentTarget);
    setEditingCategory(category);
  };

  const handleCategoryMenuClose = () => {
    setAnchorEl(null);
    setEditingCategory(null);
  };

  const handleEditCategory = async() => {
    


    const newCategoryName = prompt("Edit category name:", editingCategory.name);
    //newCategoryName is the edited name

    console.log(editingCategory.name);

    console.log("In Edit Category",newCategoryName);
    if (newCategoryName) {
      setCategories(
        categories.map((cat) =>
          
          cat.name === editingCategory.name
            ? { ...cat, name: newCategoryName }
            : cat
        )

        
        
      );

      try{

      //making update request
      const updatedData = await axios.patch(`/card-add-document/${user_personal}`,
        {
          updatedCategory : newCategoryName,
          previousCategory : editingCategory.name

        })


        if(updatedData.status == 200) handleCategoryMenuClose();


        useEffect(()=>{
          fetchCategories()
        })
          

      }
      catch(err)
      {
        console.log(`Error Connecting with the Backend API ${err.message}`);
      }


      setFiles(
        files.map((file) =>
          file.category === editingCategory.name
            ? { ...file, category: newCategoryName }
            : file
        )
      );
    }
    handleCategoryMenuClose();
  };

  const handleDeleteCategory = () => {
    console.log(editingCategory.name);

    setCategories(
      categories.filter((cat) => cat.name !== editingCategory.name)
    );

    //deleting category in the backend
    //also handling deletion of files included in deleted category

    try{
       axios.delete(`/card-add-document/${user_personal}`,
      {
        params : {
          deleted_category : editingCategory.name
        }
      },
        
      )

      useEffect(()=>{
        fetchCategories()
      })

    } catch(err)
    {
      console.log(`"Failed to connect with Backend : ${err.message}`);
    }


  
    setFiles(files.filter((file) => file.category !== editingCategory.name));
    handleCategoryMenuClose();
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortByDate = () => {
    setFiles([...files].sort((a, b) => new Date(b.date) - new Date(a.date)));
    handleSortClose();
  };

  const handleSortByName = () => {
    setFiles([...files].sort((a, b) => a.name.localeCompare(b.name)));
    handleSortClose();
  };

  // const handleDownload = (file) => {
  //   try {
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', file.name);
  //     document.body.appendChild(link);console.log("Categories:", categories);
console.log("Files:", files);
console.log("Selected Category:", selectedCategory);
console.log("Search Term:", searchTerm);
console.log("Editing Category:", editingCategory);
console.log("Anchor El:", anchorEl);
console.log("Filter Anchor El:", filterAnchorEl);
console.log("Sort Anchor El:", sortAnchorEl);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error(`Error downloading the file: ${file.name}`, error);
  //   }
  // };

  const handleDelete = async(fileToDelete) => {
    console.log(fileToDelete);
    //handling file delete without deleting category
    try{
      const deleteFiles = await axios.delete(`/card-add-document/${user_personal}/delete-file`,
        {
          params : {
            deletedFile : fileToDelete
          }
        }

      


      )

      if(deleteFiles) 
      {
        useEffect(()=>{
          fetchFile()
        })
      }

    }

    catch(err)
    {
      console.log(`Couldn't connect with the backend API ${err.message}`);
    }

    const updatedFiles = files.filter((file) => file !== fileToDelete);
    setFiles(updatedFiles);
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <>
      <div className="cardhome_container">
        <div className="upper_bar">
          <img src={logo} alt="" />
          <div className="welcome">
            <h1>Welcome</h1>
            <h3>{pass.user_data}</h3>
          </div>
        </div>

        <div className="nav_container_card">
          <div className="vertical_nav">
            <Link to={"/logout-successful"}>
              <button className="logout">
                <div>
                  <CiLogout className="logout_icon" />
                </div>

                <p>Logout</p>
              </button>
            </Link>
            <div className="nav_content">
              <Link to={`/user-personal-info/${pass.user_id}`} className="widthfull">
                <button className="buttons">
                  <span>
                    <FaUserCircle className="vertical_nav_icon" />
                  </span>
                  <p>Profile</p>{" "}
                </button>
              </Link>
              <Link to={"/carddocument"} className="widthfull">
                {" "}
                <button className="highlight">
                  <span>
                    <IoDocumentSharp className="vertical_nav_icon" />
                  </span>
                  <p>Documents</p>{" "}
                </button>
              </Link>
              <Link
                to={`/user-personal-credentials-info/${pass.user_id}`}
                className="widthfull"
              >
                <button className="buttons">
                  <span>
                    <FaLock className="vertical_nav_icon" />
                  </span>
                  <p>Passwords</p>{" "}
                </button>
              </Link>
              <Link to={"/cardhelp"} className="widthfull">
                <button className="buttons">
                  <span>
                    <IoIosHelpCircle className="vertical_nav_icon" />
                  </span>
                  <p> Help</p>
                </button>
              </Link>
            </div>
            <img src={document} className="document_image" alt="" />
          </div>

          {/* document main */}
          <div style={styles.container}>
            <div style={styles.categoryHead}>Categories</div>

            {/* categories container */}
            <div style={styles.categoriesContainer}>
              <Grid container spacing={4}>
                {categories.map((category, index) => (
                  <Grid item key={index}>
                    <div
                      style={{
                        ...styles.categoryCard,
                        backgroundColor: category.color,
                      }}
                      onClick={() => handleOpenFileDialog(category.name)}
                    >
                      {/* category popup */}
                      <Typography variant="h6" style={styles.categoryName}>
                        {category.name}
                      </Typography>

                      {/* edit delete category menu */}
                      <IconButton
                        size="small"
                        style={styles.categoryMenuButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryMenuClick(e, category);
                        }}
                      >
                        <MoreVert style={styles.moreVertIcon} />
                      </IconButton>
                    </div>
                  </Grid>
                ))}
                <Grid item>
                  {/* add category button */}
                  <Button
                    variant="contained"
                    style={styles.addCategoryButton}
                    onClick={handleOpenCategoryDialog}
                  >
                    <Add /> Add Category
                  </Button>
                </Grid>
              </Grid>
            </div>

            {/* menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCategoryMenuClose}
            >
              <MenuItem onClick={handleEditCategory}>Edit Category</MenuItem>
              <MenuItem onClick={handleDeleteCategory}>
                Delete Category{" "}
              </MenuItem>
            </Menu>

            {/* file add popup */}
          
            <Dialog open={openFileDialog} onClose={handleCloseFileDialog}>
              <DialogTitle>Add File to {selectedCategory}</DialogTitle>
              <DialogContent>
                <input type="file" onChange={handleAddFile} />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseFileDialog}
                  style={styles.dialogButton}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

           

            {/* category add popup */}
            <Dialog
              open={openCategoryDialog}
              onClose={handleCloseCategoryDialog}
            >
              <DialogTitle>Add New Category</DialogTitle>
              <DialogContent>
                <TextField
                  label="Category Name"
                  variant="outlined"
                  fullWidth
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseCategoryDialog}
                  style={styles.dialogButton}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddCategory} style={styles.dialogButton}>
                  Add
                </Button>
              </DialogActions>
            </Dialog>

            {/* files container */}
            <div style={styles.recentFilesContainer}>
              <div style={styles.filterSortContainer}>
                {/* search bar  */}
                <TextField
                  label="Search Documents"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: <Search style={{ color: "#121311" }} />,

                    style: {
                      borderRadius: "20px",
                    },
                  }}
                  style={styles.searchBar}
                  value={searchTerm}
                  onChange={handleSearch}
                />
                {/* filter button  */}
                <IconButton
                  style={styles.filterSortButton}
                  onClick={handleFilterClick}
                >
                  <FilterList />
                </IconButton>
                {/* filter menu  */}
                <Menu
                  anchorEl={filterAnchorEl}
                  open={Boolean(filterAnchorEl)}
                  onClose={handleFilterClose}
                >
                  <MenuItem onClick={() => setSelectedCategory("")}>
                    View All
                  </MenuItem>
                  {categories.map((category, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      View {category.name} Files
                    </MenuItem>
                  ))}
                </Menu>

                {/* sort button  */}
                <IconButton
                  style={styles.filterSortButton}
                  onClick={handleSortClick}
                >
                  <Sort />
                </IconButton>
                {/* sort menu  */}
                <Menu
                  anchorEl={sortAnchorEl}
                  open={Boolean(sortAnchorEl)}
                  onClose={handleSortClose}
                >
                  <MenuItem onClick={handleSortByDate}>Sort by Date</MenuItem>
                  <MenuItem onClick={handleSortByName}>Sort by Name</MenuItem>
                </Menu>
              </div>

              {/* files header  */}
              <Typography variant="h6" fullWidth style={styles.heading}>
                {selectedCategory
                  ? `Files in ${selectedCategory}`
                  : "Recently Added Files"}
              </Typography>
              <div style={styles.fileListContainer}>
                <List>
                  {/* files list  */}
                  {filteredFiles.map((file, index) => (
                    <Card key={index} style={styles.fileCard}>
                      <CardContent>
                        <ListItem>
                          <Article
                            sx={{
                              backgroundColor: getRandomColor(),
                              padding: "2vh",
                              borderRadius: "10px",
                            }}
                          />

                          <ListItemText
                            primary={file.name}
                            secondary={`${file.category} - ${file.date}`}
                            style={styles.fileText}
                          />
                          {/* view file button*/}
                          <IconButton
                            style={styles.viewButton}
                            onClick={() => window.open(file.url, "_blank")}
                          >

                            <GetApp />
                          </IconButton>

                          {/* download file button
                          <IconButton
                            style={styles.viewButton}
                            onClick={() => handleDownload(file)}
                          >
                            <GetApp />
                          </IconButton> */}

                          {/* delete file button*/}
                          <IconButton
                            style={styles.viewButton}
                            onClick={() => handleDelete(file)}
                          >
                            <Delete />
                          </IconButton>
                        </ListItem>
                      </CardContent>
                    </Card>
                  ))}
                </List>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    position: "relative",
    padding: "5vh",
    left: "20vw",
    top: "18vh",
    width: "68rem",
    marginBottom: "25vh",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    borderRadius: "30px",
    backgroundColor: "#ecf2fc",
    boxShadow: "0 10px 30px #111, inset 5px 5px 15px #fff",
    gap: "2vw",
    justifyContent: "space-evenly",
  },
  categoriesContainer: {
    padding: "2vh",
  },
  categoryHead: {
    fontSize: "20px",
    fontWeight: "bold",
    paddingLeft: "5vh",
    color: "#121311",
    fontFamily: "sans-serif",
  },
  categoryCard: {
    position: "relative",
    width: "20vh",
    aspectRatio: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    cursor: "pointer",
    overflow: "hidden",
    boxShadow: "0px 5px 15px #111",
  },
  categoryName: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "15px",
    textShadow: "2px 2px 5px #111",
  },
  moreVertIcon: {
    color: "#ffffff",
  },
  categoryMenuButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
  },
  addCategoryButton: {
    width: "20vh",
    aspectRatio: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cf10ff",
    borderRadius: "20px",
    boxShadow: "0px 5px 15px #111",
    color: "#ffffff",
  },
  recentFilesContainer: {
    marginTop: "20px",
    width: "100%",
  },
  filterSortContainer: {
    display: "flex",
    justifyContent: "center",
    paddingRight: "5vh",
    paddingLeft: "3vh",
    gap: "4vh",
  },
  filterSortButton: {
    color: "#121311",
  },
  heading: {
    marginTop: "20px",
    color: "#121311",
    paddingLeft: "5vh",
    fontWeight: "bold",
  },
  fileListContainer: {
    maxHeight: "70vh",
    overflowY: "scroll",
    paddingRight: "4vh",
    paddingLeft: "4vh",
    marginTop: "20px",
  },
  fileCard: {
    marginBottom: "2vh",
    height: "auto",
    backgroundColor: "#ffffff",
    boxShadow: "0 5px 5px #111",
    borderRadius: "20px",
  },
  fileText: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "5vh",
    gap: "5vh",
    color: "#121311",
  },
  viewButton: {
    color: "#121311",
  },
  dialogButton: {
    color: "#121311",
  },
};

export default CardDocument;
